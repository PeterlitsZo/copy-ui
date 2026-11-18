use std::sync::Arc;

use app::App;
use infra::Infra;
use tower::ServiceExt;
use worker::{Context, Env, HttpRequest, event};

#[event(fetch)]
async fn fetch(
    req: HttpRequest,
    env: Env,
    _ctx: Context,
) -> worker::Result<axum::response::Response> {
    let database = match env.d1("DB") {
        Ok(database) => database,
        Err(error) => {
            worker::console_error!(
                "{}",
                serde_json::json!({
                    "level": "error", "event": "d1_binding_unavailable", "error": error.to_string(),
                })
            );
            return Ok(api::service_unavailable());
        }
    };
    let app = App::new(Arc::new(Infra::from_d1(database)));
    let response = api::router(app).oneshot(req).await;
    match response {
        Ok(response) => Ok(response),
        Err(never) => match never {},
    }
}
