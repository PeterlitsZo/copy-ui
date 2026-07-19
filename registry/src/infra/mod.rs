use std::fmt::Display;

use postgres_native_tls::MakeTlsConnector;

pub(crate) struct Infra {
    database: Database,
}

pub(crate) struct InfraOptions {
    pub(crate) database: DatabaseOptions,
}

impl Infra {
    pub(crate) async fn new(opts: InfraOptions) -> InfraResult<Self> {
        let database = Database::new(opts.database).await?;
        Ok(Self { database })
    }

    pub(crate) async fn calc_1_plus_1(&self) -> InfraResult<i64> {
        self.database.calc_1_plus_1().await
    }
}

pub(crate) type InfraResult<T> = Result<T, InfraError>;

#[derive(Debug, thiserror::Error)]
pub(crate) struct InfraError {
    kind: InfraErrorKind,
    msg: String,
    #[source]
    source: Option<anyhow::Error>,
}

impl Display for InfraError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        if let Some(ref source) = self.source {
            f.write_fmt(format_args!("{}: {}", self.msg, source))
        } else {
            f.write_str(&self.msg)
        }
    }
}

impl InfraError {
    fn create_tls_connector(msg: &str) -> Self {
        Self {
            kind: InfraErrorKind::CreateTlsConnector,
            msg: String::from(msg),
            source: None,
        }
    }

    fn connect_database(msg: &str) -> Self {
        Self {
            kind: InfraErrorKind::ConnectDatabase,
            msg: String::from(msg),
            source: None,
        }
    }

    fn query_database(msg: &str) -> Self {
        Self {
            kind: InfraErrorKind::QueryDatabase,
            msg: String::from(msg),
            source: None,
        }
    }
}

impl InfraError {
    fn with_source<S>(self, source: S) -> Self
    where
        S: Into<anyhow::Error>,
    {
        Self {
            kind: self.kind,
            msg: self.msg,
            source: Some(source.into()),
        }
    }
}

#[derive(Debug)]
enum InfraErrorKind {
    CreateTlsConnector,
    ConnectDatabase,
    QueryDatabase,
}

enum Database {
    PostgreSql(PostgreSql),
}

pub(crate) enum DatabaseOptions {
    PostgreSql(PostgreSqlOptions),
}

impl Database {
    async fn new(opts: DatabaseOptions) -> InfraResult<Self> {
        match opts {
            DatabaseOptions::PostgreSql(opts) => {
                let postgre_sql = PostgreSql::new(opts).await?;
                Ok(Database::PostgreSql(postgre_sql))
            }
        }
    }

    async fn calc_1_plus_1(&self) -> InfraResult<i64> {
        match self {
            Self::PostgreSql(postgre_sql) => postgre_sql.calc_1_plus_1().await,
        }
    }
}

struct PostgreSql {
    client: tokio_postgres::Client,
}

pub(crate) struct PostgreSqlOptions {
    pub(crate) connection_address: String,
}

impl PostgreSql {
    async fn new(opts: PostgreSqlOptions) -> InfraResult<Self> {
        let connector = native_tls::TlsConnector::builder()
            .build()
            .map_err(|e| InfraError::create_tls_connector("create TLS connector").with_source(e))?;
        let connector = MakeTlsConnector::new(connector);

        let (client, connection) = tokio_postgres::connect(&opts.connection_address, connector)
            .await
            .map_err(|e| InfraError::connect_database("connect to PostgreSQL").with_source(e))?;

        tokio::spawn(async move {
            // TODO (@PeterlitsZo): Use a connection pool instead of panicking.
            if let Err(e) = connection.await {
                panic!("connection error: {}", e);
            }
        });

        Ok(Self { client })
    }

    async fn calc_1_plus_1(&self) -> InfraResult<i64> {
        let rows = self.client.query("SELECT 1 + 1", &[]).await.map_err(|e| {
            InfraError::query_database("run SELECT 1 + 1 on PostgreSQL").with_source(e)
        })?;

        let row = rows.get(0).ok_or(InfraError::query_database(
            "run SELECT 1 + 1 on PostgreSQL but returned no rows",
        ))?;
        let value: i32 = row.try_get(0).map_err(|e| {
            InfraError::query_database(
                "run SELECT 1 + 1 on PostgreSQL but the returned row does not contain column 0",
            )
            .with_source(e)
        })?;

        Ok(value as i64)
    }
}
