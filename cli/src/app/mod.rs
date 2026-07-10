use std::{fmt::Display, path::PathBuf};

use crate::config::{Config, ConfigEdit};

pub(crate) struct App;

impl App {
    pub fn new() -> Self {
        App
    }

    pub fn add_component(&self, component_name: &str, config: &PathBuf) -> AppResult<()> {
        // Check if the config file exists.
        if !config.exists() {
            // Ask if the user wants to init the config file.
            let should_init =
                inquire::Confirm::new("Config file not found. Do you want to initialize it?")
                    .with_default(true)
                    .with_help_message(&format!("A file named {config:?} will be created."))
                    .prompt()
                    .map_err(AppError::new_internal)?;
            if !should_init {
                return Err(AppError::new_config_not_found("Config file not found."));
            }

            // Write the default config to the file.
            let default_config = Config::default();
            let to_write =
                toml::to_string_pretty(&default_config).map_err(AppError::new_internal)?;
            std::fs::write(config, to_write).map_err(AppError::new_internal)?;
        }

        // Edit the config file.
        let config_content = std::fs::read_to_string(config).map_err(AppError::new_internal)?;
        let mut config_edit = ConfigEdit::new(&config_content).map_err(AppError::new_internal)?;
        config_edit
            .add_component(component_name)
            .map_err(AppError::new_internal)?;

        // Write back.
        let config_content = config_edit.to_string();
        std::fs::write(config, config_content).map_err(AppError::new_internal)?;

        // Codegen.
        todo!("codegen");
    }
}

pub(crate) struct AppError {
    pub(crate) kind: AppErrorKind,
    pub(crate) message: String,
}

impl Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}: {}", self.kind, self.message)
    }
}

impl AppError {
    pub fn new_internal<T: std::fmt::Display>(message: T) -> Self {
        AppError {
            kind: AppErrorKind::Internal,
            message: message.to_string(),
        }
    }

    pub fn new_config_not_found<T: std::fmt::Display>(message: T) -> Self {
        AppError {
            kind: AppErrorKind::ConfigNotFound,
            message: message.to_string(),
        }
    }
}

#[derive(Debug)]
pub(crate) enum AppErrorKind {
    Internal,
    ConfigNotFound,
}

impl Display for AppErrorKind {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

pub(crate) type AppResult<T> = std::result::Result<T, AppError>;
