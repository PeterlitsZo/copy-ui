mod config;
mod generator;
mod templates;

use clap::{Args, Parser, Subcommand};
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
        let metadata = templates::get_component_metadata(component_name)?;
        let Some(metadata) = metadata else {
            continue;
        };

        for dep in &metadata.deps {
            validate_dependency(
                config,
                dep,
                component_name,
                &format!("tp/components/{}/_metadata.yaml", component_name),
            );
        }
    }

    let mut util_names: Vec<&str> = config.utils.keys().map(String::as_str).collect();
    util_names.sort_unstable();

    for util_name in util_names {
        let metadata = templates::get_util_metadata(util_name)?;
        let Some(metadata) = metadata else {
            continue;
        };

        for dep in &metadata.deps {
            validate_dependency(
                config,
                dep,
                util_name,
                &format!("tp/utils/{}/_metadata.yaml", util_name),
            );
        }
    }

    Ok(())
}

fn validate_dependency(config: &config::Config, dep: &str, entry_name: &str, source: &str) {
    const COMPONENT_PREFIX: &str = "copy-ui/components/";
    const UTIL_PREFIX: &str = "copy-ui/utils/";

    if let Some(dep_component) = dep.strip_prefix(COMPONENT_PREFIX) {
        if dep_component == entry_name {
            return;
        }

        if !config.components.contains_key(dep_component) {
            println!(
                "WARN Missing component dependency for '{}': '{}' (from {})",
                entry_name, dep, source
            );
        }
        return;
    }

    if let Some(dep_util) = dep.strip_prefix(UTIL_PREFIX) {
        if !config.utils.contains_key(dep_util) {
            println!(
                "WARN Missing util dependency for '{}': '{}' (from {})",
                entry_name, dep, source
            );
        }
        return;
    }

    println!(
        "WARN Invalid dependency format for '{}': '{}' (from {}; expected copy-ui/components/<Name> or copy-ui/utils/<Name>)",
        entry_name, dep, source
    );
}

fn to_absolute_path(pwd: &Path, path: &Path) -> PathBuf {
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        pwd.join(path)
    }
}
