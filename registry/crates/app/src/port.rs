use std::{future::Future, pin::Pin};

use crate::OnePlusOneError;

pub type OnePlusOneFuture<'a> =
    Pin<Box<dyn Future<Output = Result<i64, OnePlusOneError>> + Send + 'a>>;

/// Computes the result through an external service, such as a database.
pub trait OnePlusOneService: Send + Sync {
    fn one_plus_one(&self) -> OnePlusOneFuture<'_>;
}
