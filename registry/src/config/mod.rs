use std::fmt::Display;

use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub(crate) struct Config {
    pub(crate) infra: InfraConfig,
}

impl Config {
    pub(crate) fn from_file(filename: &str) -> ConfigResult<Self> {
        let config = config::Config::builder()
            .add_source(config::File::with_name(filename))
            .build()
            .map_err(|e| {
                ConfigError::read(&format!("read config from {:?}", filename)).with_source(e)
            })?;

        let config = config.try_deserialize::<Config>().map_err(|e| {
            ConfigError::deserialize(&format!("deserialize config from {:?}", filename))
                .with_source(e)
        })?;

        Ok(config)
    }
}

pub(crate) type ConfigResult<T> = Result<T, ConfigError>;

#[derive(Debug, thiserror::Error)]
pub(crate) struct ConfigError {
    kind: ConfigErrorKind,
    msg: String,
    #[source]
    source: Option<anyhow::Error>,
}

impl Display for ConfigError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        if let Some(ref source) = self.source {
            f.write_fmt(format_args!("{}: {}", self.msg, source))
        } else {
            f.write_str(&self.msg)
        }
    }
}

impl ConfigError {
    fn read(msg: &str) -> Self {
        Self {
            kind: ConfigErrorKind::Read,
            msg: String::from(msg),
            source: None,
        }
    }

    fn deserialize(msg: &str) -> Self {
        Self {
            kind: ConfigErrorKind::Deserialize,
            msg: String::from(msg),
            source: None,
        }
    }
}

impl ConfigError {
    fn with_source<S>(self, source: S) -> Self
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
enum ConfigErrorKind {
    Read,
    Deserialize,
}

#[derive(Debug, Deserialize)]
pub(crate) struct InfraConfig {
    pub(crate) database: DatabaseConfig,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "type")]
pub(crate) enum DatabaseConfig {
    #[serde(rename = "PostgreSql")]
    PostgreSql(PostgreSqlConfig),
}

#[derive(Debug, Deserialize)]
pub(crate) struct PostgreSqlConfig {
    pub(crate) connection_address: String,
}
