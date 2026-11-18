use crate::error::{InfraError, InfraResult};
use postgres_native_tls::MakeTlsConnector;

pub(crate) struct PostgreSql {
    client: tokio_postgres::Client,
}

pub struct PostgreSqlOptions {
    pub connection_address: String,
}

impl PostgreSql {
    pub(crate) async fn new(opts: PostgreSqlOptions) -> InfraResult<Self> {
        let connector = native_tls::TlsConnector::builder()
            .build()
            .map_err(|e| InfraError::create_tls_connector("create TLS connector").with_source(e))?;
        let connector = MakeTlsConnector::new(connector);

        let (client, connection) = tokio_postgres::connect(&opts.connection_address, connector)
            .await
            .map_err(|e| InfraError::connect_database("connect to PostgreSQL").with_source(e))?;

        tokio::spawn(async move {
            if let Err(e) = connection.await {
                tracing::error!(error = %e, "PostgreSQL connection closed");
            }
        });

        Ok(Self { client })
    }

    pub(crate) async fn one_plus_one(&self) -> InfraResult<i64> {
        let rows = self
            .client
            .query("SELECT 1 + 1 AS result", &[])
            .await
            .map_err(|e| {
                InfraError::query_database("run SELECT 1 + 1 AS result on PostgreSQL")
                    .with_source(e)
            })?;

        let row = rows.first().ok_or(InfraError::query_database(
            "run SELECT 1 + 1 AS result on PostgreSQL but returned no rows",
        ))?;
        let value: i32 = row.try_get(0).map_err(|e| {
            InfraError::query_database(
                "run SELECT 1 + 1 AS result on PostgreSQL but the returned row does not contain column 0",
            )
            .with_source(e)
        })?;

        Ok(value as i64)
    }
}
