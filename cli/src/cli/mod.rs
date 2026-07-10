use clap::{Args, Parser, Subcommand};

#[derive(Debug, Parser)]
#[command(name = "copy-ui", about = "The Copy-UI CLI all you needed.")]
pub(crate) struct Cli {
    #[command(subcommand)]
    pub(crate) command: Commands,
}

#[derive(Debug, Subcommand)]
pub(crate) enum Commands {
    #[command(about = "Add a new component, utils, etc.")]
    Add(AddArgs),
}

#[derive(Debug, Args)]
pub(crate) struct AddArgs {
    #[command(subcommand)]
    pub(crate) command: AddCommand,
}

#[derive(Debug, Subcommand)]
pub(crate) enum AddCommand {
    #[command(about = "Add a new component")]
    Component(AddComponentArgs),
}

#[derive(Debug, Args)]
pub(crate) struct AddComponentArgs {
    #[arg(value_name = "component-name")]
    pub(crate) component_name: String,

    #[arg(long, default_value = "copy-ui.config.toml")]
    pub(crate) config: std::path::PathBuf,
}

pub(crate) fn parse_cli() -> Cli {
    Cli::parse()
}
