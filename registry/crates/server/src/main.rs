use std::{process::exit, sync::Arc};

use app::App;

use clap::Parser;

mod cli;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().json().init();
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
    let app = App::new(Arc::new(infra));
    let listener = tokio::net::TcpListener::bind(config.server.listen_address).await?;
    tracing::info!(address = %listener.local_addr()?, "HTTP server listening");
    axum::serve(listener, api::router(app))
        .with_graceful_shutdown(shutdown_signal())
        .await?;

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

async fn shutdown_signal() {
    let ctrl_c = async {
        if let Err(error) = tokio::signal::ctrl_c().await {
            tracing::error!(%error, "failed to listen for Ctrl-C");
        }
    };
    #[cfg(unix)]
    let terminate = async {
        match tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate()) {
            Ok(mut signal) => {
                signal.recv().await;
            }
            Err(error) => tracing::error!(%error, "failed to listen for SIGTERM"),
        }
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();
    tokio::select! { _ = ctrl_c => {}, _ = terminate => {} }
}
