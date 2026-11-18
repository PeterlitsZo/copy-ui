use app::App;
use axum::{
    Json,
    extract::State,
    response::{IntoResponse, Response},
};
use serde::Serialize;

#[derive(Serialize)]
struct OnePlusOneResponse {
    result: i64,
}

pub(crate) async fn handler(State(app): State<App>) -> Response {
    match app.one_plus_one().await {
        Ok(result) => Json(OnePlusOneResponse { result }).into_response(),
        Err(error) => {
            tracing::error!(error = %error, "one_plus_one failed");
            crate::service_unavailable()
        }
    }
}
