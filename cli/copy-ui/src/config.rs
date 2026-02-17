use serde::de::{self, Deserializer};
use serde::Deserialize;
use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Debug, Clone)]
pub struct Config {
    pub structure: StructureConfig,
    pub generator: GeneratorConfig,
    pub components: HashMap<String, ComponentConfig>,
    pub utils: HashMap<String, ComponentConfig>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum ClassHelper {
    #[default]
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

    fn from_config_value(value: &str) -> Result<Self, String> {
        match value {
            "classnames" => Ok(ClassHelper::Classnames),
            "clsx" => Ok(ClassHelper::Clsx),
            _ => Err(format!(
                "invalid generator.class-helper '{}', expected 'classnames' or 'clsx'",
                value
            )),
        }
    }
}

impl<'de> Deserialize<'de> for ClassHelper {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let value = String::deserialize(deserializer)?;
        ClassHelper::from_config_value(&value).map_err(de::Error::custom)
    }
}

#[derive(Debug, Clone, Deserialize, Default)]
pub struct GeneratorConfig {
    #[serde(default, rename = "class-helper", alias = "class_helper")]
    pub class_helper: ClassHelper,
}

#[derive(Debug, Clone, Deserialize)]
pub struct StructureConfig {
    pub components: String,
    pub utils: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct ComponentConfig {
    pub features: HashMap<String, bool>,
}

#[derive(Debug, Deserialize)]
struct StableConfig {
    structure: StructureConfig,
    #[serde(default)]
    generator: GeneratorConfig,
}

impl Config {
    pub fn from_path(path: &Path) -> anyhow::Result<Self> {
        let content = fs::read_to_string(path)
            .map_err(|e| anyhow::anyhow!("Failed to read {}: {}", path.display(), e))?;

        Self::from_toml(&content)
            .map_err(|e| anyhow::anyhow!("Failed to parse {}: {}", path.display(), e))
    }

    pub fn from_toml(content: &str) -> anyhow::Result<Self> {
        let stable_config = parse_stable_config(content)?;
        let value: toml::Value =
            toml::from_str(content).map_err(|e| anyhow::anyhow!("Failed to parse TOML: {}", e))?;

        Ok(Self {
            structure: stable_config.structure,
            generator: stable_config.generator,
            components: parse_entries(&value, "components")?,
            utils: parse_entries(&value, "utils")?,
        })
    }
}

fn parse_stable_config(content: &str) -> anyhow::Result<StableConfig> {
    let raw = ::config::Config::builder()
        .add_source(::config::File::from_str(
            content,
            ::config::FileFormat::Toml,
        ))
        .build()
        .map_err(|e| anyhow::anyhow!("Failed to load config: {}", e))?;

    raw.try_deserialize::<StableConfig>()
        .map_err(|e| anyhow::anyhow!("Failed to parse config: {}", e))
}

fn parse_entries(
    value: &toml::Value,
    section: &str,
) -> anyhow::Result<HashMap<String, ComponentConfig>> {
    let mut entries = HashMap::new();

    let Some(table) = value.get(section).and_then(|v| v.as_table()) else {
        return Ok(entries);
    };

    for (entry_name, entry_value) in table {
        let entry_table = entry_value
            .as_table()
            .ok_or_else(|| anyhow::anyhow!("{}.{} must be a table", section, entry_name))?;

        let mut features = HashMap::new();
        for (feature_key, feature_value) in entry_table {
            let feature_bool = feature_value.as_bool().ok_or_else(|| {
                anyhow::anyhow!(
                    "{}.{}.{} must be a boolean",
                    section,
                    entry_name,
                    feature_key
                )
            })?;
            features.insert(feature_key.clone(), feature_bool);
        }

        entries.insert(entry_name.clone(), ComponentConfig { features });
    }

    Ok(entries)
}
