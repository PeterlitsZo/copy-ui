mod error;
mod one_plus_one;

use app::App;
use axum::{Router, routing::get};

pub use error::service_unavailable;

pub fn router(app: App) -> Router {
    Router::new()
        .route("/api/v1/one_plus_one", get(one_plus_one::handler))
        .with_state(app)
}
