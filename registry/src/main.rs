use std::process::exit;

use clap::Parser;

mod api;
mod app;
mod cli;
mod config;
mod domain;
mod infra;

#[tokio::main]
async fn main() {
    let cli = cli::Cli::parse();

    if let Err(e) = run(cli).await {
        eprintln!("{:?}", e);
        exit(1);
    }
}

async fn run(cli: cli::Cli) -> anyhow::Result<()> {
    let config = config::Config::from_file(&cli.config)?;

    let infra_opts = build_infra_opts(&config);
    let infra = infra::Infra::new(infra_opts).await?;
    let result = infra.calc_1_plus_1().await?;

    println!("{:?}", result);

    Ok(())
}

fn build_infra_opts(config: &config::Config) -> infra::InfraOptions {
    let database = match config.infra.database {
        config::DatabaseConfig::PostgreSql(ref cfg) => {
            let opts = infra::PostgreSqlOptions {
                connection_address: cfg.connection_address.clone(),
            };

            infra::DatabaseOptions::PostgreSql(opts)
        }
    };

    infra::InfraOptions { database }
}
