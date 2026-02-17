mod config;
mod generator;
mod templates;

use std::env;
use std::fs;

fn main() -> anyhow::Result<()> {
    let pwd = env::current_dir()?;
    let config_path = pwd.join("copy-ui.config.toml");

    let config_content = fs::read_to_string(&config_path)
        .map_err(|e| anyhow::anyhow!("Failed to read copy-ui.config.toml: {}", e))?;

    let config = config::Config::from_toml(&config_content)?;

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
