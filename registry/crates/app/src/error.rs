#[derive(Debug, thiserror::Error)]
#[error("one-plus-one service unavailable: {0}")]
pub struct OnePlusOneError(#[source] Box<dyn std::error::Error + Send + Sync>);

impl OnePlusOneError {
    pub fn new(source: impl std::error::Error + Send + Sync + 'static) -> Self {
        Self(Box::new(source))
    }
}
