use std::collections::HashMap;
use toml::Value;

#[derive(Debug, Clone)]
pub struct Config {
    pub structure: StructureConfig,
    pub generator: GeneratorConfig,
    pub components: HashMap<String, ComponentConfig>,
    pub utils: HashMap<String, ComponentConfig>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ClassHelper {
    Classnames,
    Clsx,
}

impl ClassHelper {
    pub fn ident(self) -> &'static str {
        match self {
            ClassHelper::Classnames => "classNames",
            ClassHelper::Clsx => "clsx",
        }
    }

    pub fn pkg(self) -> &'static str {
        match self {
            ClassHelper::Classnames => "classnames",
            ClassHelper::Clsx => "clsx",
        }
    }
}

#[derive(Debug, Clone)]
pub struct GeneratorConfig {
    pub class_helper: ClassHelper,
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
        let root_table = value
            .as_table()
            .ok_or_else(|| anyhow::anyhow!("invalid config root table"))?;

        let structure =
            if let Some(structure_table) = root_table.get("structure").and_then(|v| v.as_table()) {
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

        if let Some(components_table) = root_table.get("components").and_then(|v| v.as_table()) {
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

        Ok(Config {
            structure,
            generator: GeneratorConfig {
                class_helper: parse_class_helper(root_table)?,
            },
            components,
            utils,
        })
    }
}

fn parse_class_helper(root_table: &toml::map::Map<String, Value>) -> anyhow::Result<ClassHelper> {
    let Some(generator_table) = root_table.get("generator") else {
        return Ok(ClassHelper::Classnames);
    };

    let generator_table = generator_table
        .as_table()
        .ok_or_else(|| anyhow::anyhow!("[generator] must be a table"))?;

    let Some(class_helper_value) = generator_table.get("class-helper") else {
        return Ok(ClassHelper::Classnames);
    };

    let class_helper = class_helper_value
        .as_str()
        .ok_or_else(|| anyhow::anyhow!("generator.class-helper must be a string"))?;

    match class_helper {
        "classnames" => Ok(ClassHelper::Classnames),
        "clsx" => Ok(ClassHelper::Clsx),
        _ => Err(anyhow::anyhow!(
            "invalid generator.class-helper '{}', expected 'classnames' or 'clsx'",
            class_helper
        )),
    }
}
