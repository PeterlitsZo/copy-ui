use std::fmt::Display;

pub type InfraResult<T> = Result<T, InfraError>;

#[derive(Debug, thiserror::Error)]
pub struct InfraError {
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
    pub(crate) fn create_tls_connector(msg: &str) -> Self {
        Self {
            kind: InfraErrorKind::CreateTlsConnector,
            msg: String::from(msg),
            source: None,
        }
    }

    pub(crate) fn connect_database(msg: &str) -> Self {
        Self {
            kind: InfraErrorKind::ConnectDatabase,
            msg: String::from(msg),
            source: None,
        }
    }

    pub(crate) fn query_database(msg: &str) -> Self {
        Self {
            kind: InfraErrorKind::QueryDatabase,
            msg: String::from(msg),
            source: None,
        }
    }
}

impl InfraError {
    pub(crate) fn with_source<S>(self, source: S) -> Self
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
