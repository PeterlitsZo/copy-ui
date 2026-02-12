use crate::config::ComponentConfig;
use anyhow::Context;
use minijinja::{context, Environment};
use std::fs;
use std::path::Path;

pub fn generate_component(
    component_name: &str,
    config: &ComponentConfig,
    output_dir: &Path,
) -> anyhow::Result<()> {
    let env = Environment::new();
    let ctx = context! {
        features => &config.features,
        component => component_name,
    };

    let index_template = crate::templates::get_component_index_template(component_name)
        .with_context(|| format!("Missing index.j2 for component '{}'", component_name))?;
    let index_template_name = format!("{}/index.j2", component_name);
    let index_rendered = render_template(
        &env,
        &index_template_name,
        index_template,
        &ctx,
    )
    .with_context(|| format!("Failed to render manifest for component '{}'", component_name))?;

    let component_output_dir = output_dir.join(component_name);
    fs::create_dir_all(&component_output_dir)?;

    let files = parse_manifest(&index_rendered);
    for filename in files {
        let template_source = crate::templates::get_component_file_template(component_name, &filename)
            .with_context(|| {
                format!(
                    "Missing template for component '{}' file '{}.j2'",
                    component_name, filename
                )
            })?;
        let template_name = format!("{}/{}.j2", component_name, filename);
        let rendered = render_template(&env, &template_name, template_source, &ctx)
            .with_context(|| {
                format!(
                    "Failed to render template '{}' for component '{}'",
                    template_name, component_name
                )
            })?;

        let output_path = component_output_dir.join(&filename);
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

fn render_template(
    env: &Environment,
    name: &str,
    source: &str,
    ctx: &minijinja::value::Value,
) -> anyhow::Result<String> {
    env.render_named_str(name, source, ctx.clone())
        .with_context(|| format!("Failed to render template '{}'", name))
}
