use std::collections::HashMap;
use toml::Value;

#[derive(Debug, Clone)]
pub struct Config {
    pub structure: StructureConfig,
    pub components: HashMap<String, ComponentConfig>,
    pub utils: HashMap<String, ComponentConfig>,
}

#[derive(Debug, Clone)]
pub struct StructureConfig {
    pub components: String,
    pub utils: Option<String>,
}

#[derive(Debug, Clone)]
pub struct ComponentConfig {
    pub features: HashMap<String, bool>,
}

impl Config {
    pub fn from_toml(content: &str) -> anyhow::Result<Self> {
        let value: Value = toml::from_str(content)?;

        let structure =
            if let Some(structure_table) = value.get("structure").and_then(|v| v.as_table()) {
                StructureConfig {
                    components: structure_table
                        .get("components")
                        .and_then(|v| v.as_str())
                        .ok_or_else(|| anyhow::anyhow!("missing structure.components"))?
                        .to_string(),
                    utils: structure_table
                        .get("utils")
                        .and_then(|v| v.as_str())
                        .map(|v| v.to_string()),
                }
            } else {
                return Err(anyhow::anyhow!("missing [structure] section"));
            };

        let mut components = HashMap::new();
        let mut utils = HashMap::new();

        if let Some(root_table) = value.as_table() {
            if let Some(components_table) = root_table.get("components").and_then(|v| v.as_table())
            {
                for (component_name, component_value) in components_table {
                    if let Some(comp_table) = component_value.as_table() {
                        let mut features = HashMap::new();
                        for (feature_key, feature_value) in comp_table {
                            if let Some(b) = feature_value.as_bool() {
                                features.insert(feature_key.clone(), b);
                            }
                        }
                        components.insert(component_name.clone(), ComponentConfig { features });
                    }
                }
            }

            if let Some(utils_table) = root_table.get("utils").and_then(|v| v.as_table()) {
                for (util_name, util_value) in utils_table {
                    if let Some(util_table) = util_value.as_table() {
                        let mut features = HashMap::new();
                        for (feature_key, feature_value) in util_table {
                            if let Some(b) = feature_value.as_bool() {
                                features.insert(feature_key.clone(), b);
                            }
                        }
                        utils.insert(util_name.clone(), ComponentConfig { features });
                    }
                }
            }
        }

        Ok(Config {
            structure,
            components,
            utils,
        })
    }
}
