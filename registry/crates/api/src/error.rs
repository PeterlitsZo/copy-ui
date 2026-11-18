use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

#[derive(Serialize)]
struct ErrorBody {
    error: ErrorDetails,
}

#[derive(Serialize)]
struct ErrorDetails {
    code: &'static str,
    message: &'static str,
}

/// Shared failure response for handlers and runtime initialization failures.
pub fn service_unavailable() -> Response {
    (
        StatusCode::SERVICE_UNAVAILABLE,
        Json(ErrorBody {
            error: ErrorDetails {
                code: "one_plus_one_unavailable",
                message: "Service unavailable",
            },
        }),
    )
        .into_response()
}
