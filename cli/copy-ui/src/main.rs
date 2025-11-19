mod ast;
mod config;
mod evaluator;
mod generator;
mod parser;

use std::env;
use std::fs;

fn main() -> anyhow::Result<()> {
    let pwd = env::current_dir()?;
    let config_path = pwd.join("copy-ui.config.toml");
    
    let config_content = fs::read_to_string(&config_path)
        .map_err(|e| anyhow::anyhow!("Failed to read copy-ui.config.toml: {}", e))?;
    
    let config = config::Config::from_toml(&config_content)?;
    
    let tp_base_dir = pwd.join("tp");
    let output_base_dir = pwd.join(&config.structure.components);
    
    for (component_name, component_config) in &config.components {
        println!("Processing component: {}", component_name);
        
        let tp_component_dir = tp_base_dir.join("components").join(component_name);
        if !tp_component_dir.exists() {
            eprintln!("Warning: Component directory not found: {}", tp_component_dir.display());
            continue;
        }
        
        generator::generate_component(
            component_name,
            component_config,
            &tp_component_dir,
            &output_base_dir,
        )?;
    }
    
    println!("Done!");
    Ok(())
}
