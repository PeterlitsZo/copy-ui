pub mod add;
pub mod codegen;

use clap::{Parser, Subcommand};

#[derive(Debug, Parser)]
#[command(
    name = "copy-ui",
    version,
    about = "Generate Copy-UI components",
    arg_required_else_help = true
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Debug, Subcommand)]
pub enum Commands {
    Codegen(codegen::CodegenArgs),
    Add(add::AddArgs),
}

pub fn run(command: Commands) -> anyhow::Result<()> {
    match command {
        Commands::Codegen(args) => codegen::run(args),
        Commands::Add(args) => add::run(args),
    }
}
