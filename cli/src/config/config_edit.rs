use std::fmt::Display;

use toml_edit::DocumentMut;

use super::{ComponentConfig, Config};

pub(crate) struct ConfigEdit {
    config: Config,
    inner: DocumentMut,
}

impl ConfigEdit {
    pub(crate) fn new(config: &str) -> ConfigEditResult<ConfigEdit> {
        let parsed_config = toml::from_str::<Config>(config).map_err(ConfigEditError::new_parse)?;

        let inner = config
            .parse::<DocumentMut>()
            .map_err(ConfigEditError::new_parse)?;

        Ok(ConfigEdit {
            config: parsed_config,
            inner,
        })
    }

    pub(crate) fn add_component(&mut self, component_name: &str) -> ConfigEditResult<()> {
        match &mut self.config {
            Config::V1(config) => {
                let component_config = ComponentConfig::default();
                let component_config_table = {
                    let doc = toml_edit::ser::to_document(&component_config)
                        .map_err(ConfigEditError::new_internal)?;
                    doc.into_table()
                };
                config
                    .components
                    .add_component(component_name, component_config);
                self.inner["components"][component_name] = component_config_table.into();
            }
        }

        Ok(())
    }

    pub(crate) fn to_string(&self) -> String {
        self.inner.to_string()
    }
}

pub(crate) struct ConfigEditError {
    pub(crate) kind: ConfigEditErrorKind,
    pub(crate) message: String,
}

impl ConfigEditError {
    pub(crate) fn new_internal<T: Display>(message: T) -> Self {
        Self {
            kind: ConfigEditErrorKind::Internal,
            message: message.to_string(),
        }
    }

    pub(crate) fn new_parse<T: Display>(message: T) -> Self {
        Self {
            kind: ConfigEditErrorKind::Parse,
            message: message.to_string(),
        }
    }
}

impl Display for ConfigEditError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}: {}", self.kind, self.message)
    }
}

#[derive(Debug)]
pub(crate) enum ConfigEditErrorKind {
    Internal,
    Parse,
}

impl Display for ConfigEditErrorKind {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

pub(crate) type ConfigEditResult<T> = Result<T, ConfigEditError>;
