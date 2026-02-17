use crate::config::{ComponentConfig, GeneratorConfig};
use anyhow::Context;
use minijinja::{context, Environment};
use std::fs;
use std::path::Path;

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
    let ctx = context! {
        features => &config.features,
        component => entry_name,
        util => entry_name,
        item => entry_name,
        class_helper_ident => generator_config.class_helper.ident(),
        class_helper_pkg => generator_config.class_helper.pkg(),
    };

    let index_template = match entry_group {
        "components" => crate::templates::get_component_index_template(entry_name),
        "utils" => crate::templates::get_util_index_template(entry_name),
        _ => Err(anyhow::anyhow!(
            "Unsupported template group: {}",
            entry_group
        )),
    }
    .with_context(|| format!("Missing index.j2 for {} '{}'", entry_kind, entry_name))?;
    let index_template_name = format!("{}/{}/index.j2", entry_group, entry_name);
    let index_rendered = render_template(&env, &index_template_name, index_template, &ctx)
        .with_context(|| {
            format!(
                "Failed to render manifest for {} '{}'",
                entry_kind, entry_name
            )
        })?;

    let entry_output_dir = output_dir.join(entry_name);
    fs::create_dir_all(&entry_output_dir)?;

    let files = parse_manifest(&index_rendered);
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

    for filename in files {
        let template_source = match entry_group {
            "components" => crate::templates::get_component_file_template(entry_name, &filename),
            "utils" => crate::templates::get_util_file_template(entry_name, &filename),
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

        let output_path = entry_output_dir.join(&filename);
        if let Some(parent) = output_path.parent() {
            fs::create_dir_all(parent)?;
        }
        fs::write(&output_path, rendered)?;
        println!("Generated: {}", output_path.display());
    }

    Ok(())
}

fn parse_manifest(content: &str) -> Vec<String> {
    content
        .lines()
        .map(|line| line.trim())
        .filter(|line| !line.is_empty() && !line.starts_with('#'))
        .map(|line| line.to_string())
        .collect()
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
