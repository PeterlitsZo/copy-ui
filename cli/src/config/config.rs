use std::{collections::HashMap, path::PathBuf};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "schema_version", rename_all = "camelCase")]
pub(crate) enum Config {
    V1(ConfigV1),
}

impl Default for Config {
    fn default() -> Self {
        Self::V1(ConfigV1::default())
    }
}

#[derive(Serialize, Deserialize, Default)]
pub(crate) struct ConfigV1 {
    pub(crate) structure: StructureConfig,
    pub(crate) components: ComponentsConfig,
}

#[derive(Serialize, Deserialize)]
pub(crate) struct StructureConfig {
    pub(crate) components: PathBuf,
}

impl Default for StructureConfig {
    fn default() -> Self {
        Self {
            components: PathBuf::from("src/components"),
        }
    }
}

#[derive(Serialize, Deserialize, Default)]
pub(crate) struct ComponentsConfig(pub(crate) HashMap<String, ComponentConfig>);

impl ComponentsConfig {
    pub(crate) fn add_component(&mut self, name: &str, config: ComponentConfig) {
        self.0.insert(name.to_string(), config);
    }
}

#[derive(Serialize, Deserialize)]
pub(crate) struct ComponentConfig {
    pub(crate) enable: bool,
    pub(crate) style_provider: ComponentStyleProvider,
}

impl Default for ComponentConfig {
    fn default() -> Self {
        Self {
            enable: true,
            style_provider: ComponentStyleProvider::StyleX,
        }
    }
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub(crate) enum ComponentStyleProvider {
    StyleX,
    TailwindCss,
}
