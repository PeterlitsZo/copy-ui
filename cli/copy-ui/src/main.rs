mod config;
mod generator;
mod templates;

use clap::{Args, Parser, Subcommand};
use minijinja::{context, Environment};
use std::env;
use std::path::{Path, PathBuf};

#[derive(Debug, Parser)]
#[command(
    name = "copy-ui",
    version,
    about = "Generate Copy-UI components",
    arg_required_else_help = true
)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
    Codegen(CodegenArgs),
}

#[derive(Debug, Args)]
struct CodegenArgs {
    #[arg(long, default_value = "copy-ui.config.toml")]
    config: PathBuf,

    #[arg(long)]
    emit_changelog: Option<bool>,
}

fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Codegen(args) => run_codegen(args),
    }
}

fn run_codegen(args: CodegenArgs) -> anyhow::Result<()> {
    let pwd = env::current_dir()?;
    let config_path = to_absolute_path(&pwd, &args.config);
    let mut config = config::Config::from_path(&config_path)?;

    if let Some(emit_changelog) = args.emit_changelog {
        config.generator.metadata.emit_changelog = emit_changelog;
    }

    validate_dependencies(&config)?;

    let components_output_base_dir = pwd.join(&config.structure.components);

    for (component_name, component_config) in &config.components {
        println!("Processing component: {}", component_name);

        generator::generate_component(
            component_name,
            component_config,
            &config.generator,
            &components_output_base_dir,
        )?;
    }

    if !config.utils.is_empty() {
        let utils_output_base_dir = config
            .structure
            .utils
            .as_ref()
            .map(|utils_dir| pwd.join(utils_dir))
            .ok_or_else(|| anyhow::anyhow!("missing structure.utils while [utils] is set"))?;

        for (util_name, util_config) in &config.utils {
            println!("Processing util: {}", util_name);

            generator::generate_util(
                util_name,
                util_config,
                &config.generator,
                &utils_output_base_dir,
            )?;
        }
    }

    println!("Done!");
    Ok(())
}

fn validate_dependencies(config: &config::Config) -> anyhow::Result<()> {
    let mut component_names: Vec<&str> = config.components.keys().map(String::as_str).collect();
    component_names.sort_unstable();

    for component_name in component_names {
        let Some(component_config) = config.components.get(component_name) else {
            continue;
        };

        let metadata = templates::get_component_metadata(component_name)?;
        let Some(metadata) = metadata else {
            continue;
        };

        for (dep_index, dep) in metadata.deps.iter().enumerate() {
            if !should_validate_dependency(
                dep,
                component_config,
                "components",
                component_name,
                dep_index,
            )? {
                continue;
            }

            validate_dependency(
                config,
                dep,
                "components",
                component_name,
                &format!("tp/components/{}/_metadata.yaml", component_name),
            )?;
        }
    }

    let mut util_names: Vec<&str> = config.utils.keys().map(String::as_str).collect();
    util_names.sort_unstable();

    for util_name in util_names {
        let Some(util_config) = config.utils.get(util_name) else {
            continue;
        };

        let metadata = templates::get_util_metadata(util_name)?;
        let Some(metadata) = metadata else {
            continue;
        };

        for (dep_index, dep) in metadata.deps.iter().enumerate() {
            if !should_validate_dependency(dep, util_config, "utils", util_name, dep_index)? {
                continue;
            }

            validate_dependency(
                config,
                dep,
                "utils",
                util_name,
                &format!("tp/utils/{}/_metadata.yaml", util_name),
            )?;
        }
    }

    Ok(())
}

fn should_validate_dependency(
    dep: &templates::DependencyRule,
    entry_config: &config::ComponentConfig,
    entry_group: &str,
    entry_name: &str,
    dep_index: usize,
) -> anyhow::Result<bool> {
    let Some(condition) = dep.when() else {
        return Ok(true);
    };

    let condition = condition.trim();
    if condition.is_empty() {
        return Ok(true);
    }

    let mut env = Environment::new();
    env.set_trim_blocks(true);
    env.set_lstrip_blocks(true);
    env.set_keep_trailing_newline(true);

    let template_source = format!("{{% if {} %}}true{{% else %}}false{{% endif %}}", condition);
    let template_name = format!(
        "metadata-dep-when/{}/{}/deps[{}]",
        entry_group, entry_name, dep_index
    );

    let ctx = context! {
        features => &entry_config.features,
    };

    let rendered = env
        .render_named_str(&template_name, &template_source, ctx)
        .map_err(|e| {
            anyhow::anyhow!(
                "Failed to evaluate dependency condition '{}' in tp/{}/{}/_metadata.yaml deps[{}].when: {}",
                condition,
                entry_group,
                entry_name,
                dep_index,
                e
            )
        })?;

    match rendered.trim() {
        "true" => Ok(true),
        "false" => Ok(false),
        value => Err(anyhow::anyhow!(
            "Invalid dependency condition result '{}' in tp/{}/{}/_metadata.yaml deps[{}].when",
            value,
            entry_group,
            entry_name,
            dep_index
        )),
    }
}

fn validate_dependency(
    config: &config::Config,
    dep: &templates::DependencyRule,
    entry_group: &str,
    entry_name: &str,
    source: &str,
) -> anyhow::Result<()> {
    const COMPONENT_PREFIX: &str = "copy-ui/components/";
    const UTIL_PREFIX: &str = "copy-ui/utils/";
    let dep_path = dep.dep();

    if let Some(dep_component) = dep_path.strip_prefix(COMPONENT_PREFIX) {
        if dep_component == entry_name {
            return Ok(());
        }

        let Some(dep_component_config) = config.components.get(dep_component) else {
            println!(
                "WARN Missing component dependency for '{}': '{}' (from {})",
                entry_name, dep_path, source
            );
            return Ok(());
        };

        if let Some(required_features) = dep.required_features() {
            validate_required_features(
                required_features,
                &dep_component_config.features,
                entry_group,
                entry_name,
                "components",
                dep_component,
                source,
            )?;
        }

        return Ok(());
    }

    if let Some(dep_util) = dep_path.strip_prefix(UTIL_PREFIX) {
        let Some(dep_util_config) = config.utils.get(dep_util) else {
            println!(
                "WARN Missing util dependency for '{}': '{}' (from {})",
                entry_name, dep_path, source
            );
            return Ok(());
        };

        if let Some(required_features) = dep.required_features() {
            validate_required_features(
                required_features,
                &dep_util_config.features,
                entry_group,
                entry_name,
                "utils",
                dep_util,
                source,
            )?;
        }

        return Ok(());
    }

    println!(
        "WARN Invalid dependency format for '{}': '{}' (from {}; expected copy-ui/components/<Name> or copy-ui/utils/<Name>)",
        entry_name, dep_path, source
    );

    Ok(())
}

fn validate_required_features(
    required_features: &std::collections::HashMap<String, bool>,
    actual_features: &std::collections::HashMap<String, bool>,
    entry_group: &str,
    entry_name: &str,
    dep_group: &str,
    dep_name: &str,
    source: &str,
) -> anyhow::Result<()> {
    let mut required_feature_names = required_features.keys().cloned().collect::<Vec<_>>();
    required_feature_names.sort();

    for feature_name in required_feature_names {
        let expected = required_features
            .get(&feature_name)
            .copied()
            .unwrap_or(false);
        let actual = actual_features.get(&feature_name).copied().unwrap_or(false);

        if actual != expected {
            anyhow::bail!(
                "Invalid config: [{}.{}] requires [{}.{}.features.{}] = {} (declared in {}).",
                entry_group,
                entry_name,
                dep_group,
                dep_name,
                feature_name,
                expected,
                source
            );
        }
    }

    Ok(())
}

fn to_absolute_path(pwd: &Path, path: &Path) -> PathBuf {
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        pwd.join(path)
    }
}
