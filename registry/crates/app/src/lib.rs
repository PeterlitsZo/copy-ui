mod error;
pub mod port;

use std::sync::Arc;

pub use error::OnePlusOneError;
use port::OnePlusOneService;

#[derive(Clone)]
pub struct App {
    one_plus_one_service: Arc<dyn OnePlusOneService>,
}

impl App {
    pub fn new(one_plus_one_service: Arc<dyn OnePlusOneService>) -> Self {
        Self {
            one_plus_one_service,
        }
    }

    pub async fn one_plus_one(&self) -> Result<i64, OnePlusOneError> {
        self.one_plus_one_service.one_plus_one().await
    }
}
