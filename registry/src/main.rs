use std::process::exit;

mod api;
mod app;
mod config;
mod domain;
mod infra;

#[tokio::main]
async fn main() {
    if let Err(e) = run().await {
        eprintln!("{:?}", e);
        exit(1);
    }
}

async fn run() -> anyhow::Result<()> {
    // TODO (@PeterlitsZo): Use clap to parse the config file path.
    let config = config::Config::from_file("test.toml")?;

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
