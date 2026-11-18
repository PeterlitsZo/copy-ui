#[cfg(all(feature = "d1", target_arch = "wasm32"))]
mod d1;
#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
mod error;
#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
mod postgres;

use app::port::{OnePlusOneFuture, OnePlusOneService};

#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
pub use error::{InfraError, InfraResult};
#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
pub use postgres::PostgreSqlOptions;

pub struct Infra {
    database: Database,
}

enum Database {
    #[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
    PostgreSql(postgres::PostgreSql),
    #[cfg(all(feature = "d1", target_arch = "wasm32"))]
    D1(d1::D1),
}

#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
pub struct InfraOptions {
    pub database: DatabaseOptions,
}

#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
pub enum DatabaseOptions {
    PostgreSql(PostgreSqlOptions),
}

#[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
impl Infra {
    pub async fn new(opts: InfraOptions) -> InfraResult<Self> {
        let database = match opts.database {
            DatabaseOptions::PostgreSql(opts) => {
                Database::PostgreSql(postgres::PostgreSql::new(opts).await?)
            }
        };
        Ok(Self { database })
    }
}

#[cfg(all(feature = "d1", target_arch = "wasm32"))]
impl Infra {
    pub fn from_d1(database: worker::D1Database) -> Self {
        Self {
            database: Database::D1(d1::D1::new(database)),
        }
    }
}

impl OnePlusOneService for Infra {
    fn one_plus_one(&self) -> OnePlusOneFuture<'_> {
        match &self.database {
            #[cfg(all(feature = "postgres", not(target_arch = "wasm32")))]
            Database::PostgreSql(database) => Box::pin(async move {
                database
                    .one_plus_one()
                    .await
                    .map_err(app::OnePlusOneError::new)
            }),
            #[cfg(all(feature = "d1", target_arch = "wasm32"))]
            Database::D1(database) => database.one_plus_one(),
            // With no backend enabled Infra cannot be constructed.
            #[cfg(not(any(
                all(feature = "postgres", not(target_arch = "wasm32")),
                all(feature = "d1", target_arch = "wasm32")
            )))]
            _ => unreachable!("no infrastructure backend enabled"),
        }
    }
}
