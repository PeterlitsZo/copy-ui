mod commands;
mod config;
mod deps;
mod generator;
mod templates;
mod utils;

use clap::Parser;

fn main() -> anyhow::Result<()> {
    let cli = commands::Cli::parse();
    commands::run(cli.command)
}
