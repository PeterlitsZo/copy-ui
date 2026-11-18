use app::{OnePlusOneError, port::OnePlusOneFuture};
use worker::{D1Database, send::SendFuture};

pub(crate) struct D1 {
    database: D1Database,
}

impl D1 {
    pub(crate) fn new(database: D1Database) -> Self {
        Self { database }
    }

    pub(crate) fn one_plus_one(&self) -> OnePlusOneFuture<'_> {
        // D1Database is already Send + Sync in worker 0.9.0. Only its JS future
        // needs adaptation; this module runs solely in single-threaded Workers.
        Box::pin(SendFuture::new(async move {
            let result = self
                .database
                .prepare("SELECT 1 + 1 AS result")
                .first::<i64>(Some("result"))
                .await
                .map_err(|error| query_error(format!("query D1: {error}")))?;
            result.ok_or_else(|| query_error("D1 query returned no result".into()))
        }))
    }
}

fn query_error(message: String) -> OnePlusOneError {
    worker::console_error!(
        "{}",
        serde_json::json!({
            "level": "error", "event": "one_plus_one_failed", "error": message,
        })
    );
    OnePlusOneError::new(std::io::Error::other(message))
}
