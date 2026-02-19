use crate::config;
use crate::deps;
use crate::generator;
use crate::utils::to_absolute_path;
use clap::Args;
use std::env;
use std::path::PathBuf;

#[derive(Debug, Args)]
pub struct CodegenArgs {
    #[arg(long, default_value = "copy-ui.config.toml")]
    config: PathBuf,

    #[arg(long)]
    emit_changelog: Option<bool>,
}

pub fn run(args: CodegenArgs) -> anyhow::Result<()> {
    let pwd = env::current_dir()?;
    let config_path = to_absolute_path(&pwd, &args.config);
    let mut config = config::Config::from_path(&config_path)?;

    if let Some(emit_changelog) = args.emit_changelog {
        config.generator.metadata.emit_changelog = emit_changelog;
    }

    deps::validate_dependencies(&config)?;

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
