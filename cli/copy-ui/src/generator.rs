use crate::config::{ComponentConfig, GeneratorConfig};
use anyhow::Context;
use minijinja::{context, value::Value, Environment};
use std::fs;
use std::path::Path;

const CHANGELOG_WRAP_COLUMN: usize = 80;

pub fn generate_component(
    component_name: &str,
    config: &ComponentConfig,
    generator_config: &GeneratorConfig,
    output_dir: &Path,
) -> anyhow::Result<()> {
    generate_entry(
        "component",
        "components",
        component_name,
        config,
        generator_config,
        output_dir,
    )
}

pub fn generate_util(
    util_name: &str,
    config: &ComponentConfig,
    generator_config: &GeneratorConfig,
    output_dir: &Path,
) -> anyhow::Result<()> {
    generate_entry(
        "util",
        "utils",
        util_name,
        config,
        generator_config,
        output_dir,
    )
}

fn generate_entry(
    entry_kind: &str,
    entry_group: &str,
    entry_name: &str,
    config: &ComponentConfig,
    generator_config: &GeneratorConfig,
    output_dir: &Path,
) -> anyhow::Result<()> {
    let mut env = Environment::new();
    env.set_trim_blocks(true);
    env.set_lstrip_blocks(true);
    env.set_keep_trailing_newline(true);

    let metadata = match entry_group {
        "components" => crate::templates::get_component_metadata(entry_name),
        "utils" => crate::templates::get_util_metadata(entry_name),
        _ => Err(anyhow::anyhow!(
            "Unsupported template group: {}",
            entry_group
        )),
    }
    .with_context(|| {
        format!(
            "Failed to read _metadata.yaml for {} '{}'",
            entry_kind, entry_name
        )
    })?
    .ok_or_else(|| {
        anyhow::anyhow!(
            "Missing _metadata.yaml for {} '{}'. Expected at tp/{}/{}/_metadata.yaml",
            entry_kind,
            entry_name,
            entry_group,
            entry_name
        )
    })?;

    let ctx = context! {
        features => &config.features,
        component => entry_name,
        util => entry_name,
        item => entry_name,
        class_helper_ident => generator_config.class_helper.ident(),
        class_helper_pkg => generator_config.class_helper.pkg(),
        components_import_base => &generator_config.import.components,
        utils_import_base => &generator_config.import.utils,
        version => &metadata.current.version,
        date => &metadata.current.date,
    };

    let files = resolve_manifest_files(&env, entry_group, entry_name, &metadata.files, &ctx)?;

    let entry_output_dir = output_dir.join(entry_name);
    fs::create_dir_all(&entry_output_dir)?;

    let managed_files = match entry_group {
        "components" => crate::templates::list_component_template_files(entry_name),
        "utils" => crate::templates::list_util_template_files(entry_name),
        _ => Err(anyhow::anyhow!(
            "Unsupported template group: {}",
            entry_group
        )),
    }
    .with_context(|| {
        format!(
            "Failed to list managed template files for {} '{}'",
            entry_kind, entry_name
        )
    })?;

    remove_stale_generated_files(&entry_output_dir, &managed_files, &files)?;

    for filename in &files {
        let template_source = match entry_group {
            "components" => crate::templates::get_component_file_template(entry_name, filename),
            "utils" => crate::templates::get_util_file_template(entry_name, filename),
            _ => Err(anyhow::anyhow!(
                "Unsupported template group: {}",
                entry_group
            )),
        }
        .with_context(|| {
            format!(
                "Missing template for {} '{}' file '{}.j2'",
                entry_kind, entry_name, filename
            )
        })?;
        let template_name = format!("{}/{}/{}.j2", entry_group, entry_name, filename);
        let rendered =
            render_template(&env, &template_name, template_source, &ctx).with_context(|| {
                format!(
                    "Failed to render template '{}' for {} '{}'",
                    template_name, entry_kind, entry_name
                )
            })?;

        let output_path = entry_output_dir.join(filename);
        if let Some(parent) = output_path.parent() {
            fs::create_dir_all(parent)?;
        }
        fs::write(&output_path, rendered)?;
        println!("Generated: {}", output_path.display());
    }

    maybe_emit_changelog(
        entry_kind,
        entry_name,
        &entry_output_dir,
        &metadata.changelog,
        generator_config,
    )?;

    Ok(())
}

fn resolve_manifest_files(
    env: &Environment,
    entry_group: &str,
    entry_name: &str,
    file_rules: &[crate::templates::FileRule],
    ctx: &Value,
) -> anyhow::Result<Vec<String>> {
    if file_rules.is_empty() {
        return Err(anyhow::anyhow!(
            "Missing files in tp/{}/{}/_metadata.yaml",
            entry_group,
            entry_name
        ));
    }

    let mut files = Vec::new();

    for (index, file_rule) in file_rules.iter().enumerate() {
        let filename = file_rule.filename.trim();
        if filename.is_empty() {
            return Err(anyhow::anyhow!(
                "Invalid files[{}] in tp/{}/{}/_metadata.yaml: filename cannot be empty",
                index,
                entry_group,
                entry_name
            ));
        }

        let should_include = match file_rule.when.as_deref() {
            Some(condition) => {
                evaluate_file_rule_condition(env, entry_group, entry_name, index, condition, ctx)?
            }
            None => true,
        };

        if should_include {
            files.push(filename.to_string());
        }
    }

    Ok(files)
}

fn evaluate_file_rule_condition(
    env: &Environment,
    entry_group: &str,
    entry_name: &str,
    file_index: usize,
    condition: &str,
    ctx: &Value,
) -> anyhow::Result<bool> {
    let condition = condition.trim();
    if condition.is_empty() {
        return Ok(true);
    }

    let template_source = format!("{{% if {} %}}true{{% else %}}false{{% endif %}}", condition);
    let template_name = format!(
        "metadata-when/{}/{}/files[{}]",
        entry_group, entry_name, file_index
    );

    let rendered = env
        .render_named_str(&template_name, &template_source, ctx.clone())
        .with_context(|| {
            format!(
                "Failed to evaluate file condition '{}' in tp/{}/{}/_metadata.yaml files[{}].when",
                condition, entry_group, entry_name, file_index
            )
        })?;

    match rendered.trim() {
        "true" => Ok(true),
        "false" => Ok(false),
        value => Err(anyhow::anyhow!(
            "Invalid file condition result '{}' in tp/{}/{}/_metadata.yaml files[{}].when",
            value,
            entry_group,
            entry_name,
            file_index
        )),
    }
}

fn maybe_emit_changelog(
    _entry_kind: &str,
    _entry_name: &str,
    entry_output_dir: &Path,
    changelog_entries: &[crate::templates::ChangelogEntry],
    generator_config: &GeneratorConfig,
) -> anyhow::Result<()> {
    if !generator_config.metadata.emit_changelog {
        return Ok(());
    }

    if changelog_entries.is_empty() {
        return Ok(());
    }

    let changelog_path = entry_output_dir.join("CHANGELOG.md");
    let changelog_content = render_changelog_markdown(changelog_entries, CHANGELOG_WRAP_COLUMN);
    fs::write(&changelog_path, changelog_content)?;
    println!("Generated: {}", changelog_path.display());

    Ok(())
}

fn render_changelog_markdown(
    entries: &[crate::templates::ChangelogEntry],
    wrap_column: usize,
) -> String {
    let mut out = String::new();

    for entry in entries {
        let prefix = format!("- {} ({}): ", entry.version.trim(), entry.date.trim());
        out.push_str(&wrap_line(&prefix, &entry.desc, wrap_column));
        out.push('\n');
    }

    out
}

fn wrap_line(prefix: &str, text: &str, wrap_column: usize) -> String {
    let normalized_text = text.split_whitespace().collect::<Vec<_>>().join(" ");
    if normalized_text.is_empty() {
        return prefix.trim_end().to_string();
    }

    let continuation_prefix = "  ";
    let prefix_len = prefix.chars().count();

    let mut out = String::new();
    let mut line = prefix.to_string();
    let mut line_len = prefix_len;

    for word in normalized_text.split(' ') {
        let word_len = word.chars().count();
        let add_space = !line.ends_with(' ');
        let projected_len = line_len + if add_space { 1 } else { 0 } + word_len;

        if projected_len > wrap_column && line_len > prefix_len {
            if !out.is_empty() {
                out.push('\n');
            }
            out.push_str(line.trim_end());

            line.clear();
            line.push_str(continuation_prefix);
            line.push_str(word);
            line_len = continuation_prefix.chars().count() + word_len;
            continue;
        }

        if add_space {
            line.push(' ');
            line_len += 1;
        }
        line.push_str(word);
        line_len += word_len;
    }

    if !out.is_empty() {
        out.push('\n');
    }
    out.push_str(line.trim_end());

    out
}

fn remove_stale_generated_files(
    output_dir: &Path,
    managed_files: &[String],
    current_manifest_files: &[String],
) -> anyhow::Result<()> {
    let current_files: std::collections::HashSet<&str> = current_manifest_files
        .iter()
        .map(|file| file.as_str())
        .collect();

    for managed_file in managed_files {
        if current_files.contains(managed_file.as_str()) {
            continue;
        }

        let stale_path = output_dir.join(managed_file);
        if !stale_path.exists() {
            continue;
        }

        if stale_path.is_dir() {
            fs::remove_dir_all(&stale_path)?;
        } else {
            fs::remove_file(&stale_path)?;
        }
        println!("Removed stale file: {}", stale_path.display());
    }

    Ok(())
}

fn render_template(
    env: &Environment,
    name: &str,
    source: &str,
    ctx: &minijinja::value::Value,
) -> anyhow::Result<String> {
    env.render_named_str(name, source, ctx.clone())
        .with_context(|| format!("Failed to render template '{}'", name))
}
