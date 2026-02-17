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
    let config = config::Config::from_path(&config_path)?;

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

fn to_absolute_path(pwd: &Path, path: &Path) -> PathBuf {
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        pwd.join(path)
    }
}
