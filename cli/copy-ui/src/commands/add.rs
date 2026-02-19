use crate::config;
use crate::deps::should_apply_dependency;
use crate::utils::to_absolute_path;
use crate::templates;
use clap::{Args, Subcommand};
use std::collections::{HashMap, HashSet, VecDeque};
use std::env;
use std::fs;
use std::path::Path;
use toml_edit::{value, DocumentMut, Item, Table};

#[derive(Debug, Args)]
pub struct AddArgs {
    #[command(subcommand)]
    command: AddCommand,
}

#[derive(Debug, Subcommand)]
enum AddCommand {
    Component(AddComponentArgs),
}

#[derive(Debug, Args)]
struct AddComponentArgs {
    #[arg(value_name = "component-name")]
    component_name: String,

    #[arg(long, default_value = "copy-ui.config.toml")]
    config: std::path::PathBuf,
}

pub fn run(args: AddArgs) -> anyhow::Result<()> {
    match args.command {
        AddCommand::Component(args) => run_add_component(args),
    }
}

fn run_add_component(args: AddComponentArgs) -> anyhow::Result<()> {
    let pwd = env::current_dir()?;
    let config_path = to_absolute_path(&pwd, &args.config);

    templates::list_component_template_files(&args.component_name).map_err(|e| {
        anyhow::anyhow!(
            "Component template '{}' not found: {}",
            args.component_name,
            e
        )
    })?;

    let content = fs::read_to_string(&config_path)
        .map_err(|e| anyhow::anyhow!("Failed to read {}: {}", config_path.display(), e))?;
    let config = config::Config::from_toml(&content)
        .map_err(|e| anyhow::anyhow!("Failed to parse {}: {}", config_path.display(), e))?;
    let mut doc = content
        .parse::<DocumentMut>()
        .map_err(|e| anyhow::anyhow!("Failed to parse {}: {}", config_path.display(), e))?;

    let mut changes = ConfigChanges::default();
    let mut components = config.components.clone();
    let mut utils = config.utils.clone();

    let mut queue = VecDeque::new();
    let mut processed: HashSet<EntryKey> = HashSet::new();
    let mut template_cache = TemplateCache::default();

    let root_entry = EntryKey::new(EntryGroup::Components, args.component_name.clone());
    ensure_entry_with_features(&root_entry, None, &mut components, &mut utils, &mut changes)?;
    queue.push_back(root_entry);

    while let Some(entry) = queue.pop_front() {
        if processed.contains(&entry) {
            continue;
        }

        processed.insert(entry.clone());

        let features = match entry.group {
            EntryGroup::Components => components
                .get(&entry.name)
                .map(|config| config.features.clone())
                .unwrap_or_default(),
            EntryGroup::Utils => utils
                .get(&entry.name)
                .map(|config| config.features.clone())
                .unwrap_or_default(),
        };

        let metadata = match entry.group {
            EntryGroup::Components => templates::get_component_metadata(&entry.name)?,
            EntryGroup::Utils => templates::get_util_metadata(&entry.name)?,
        };

        let Some(metadata) = metadata else {
            continue;
        };

        let source = format!("tp/{}/{}/_metadata.yaml", entry.group.as_str(), entry.name);

        for (dep_index, dep) in metadata.deps.iter().enumerate() {
            if !should_apply_dependency(
                dep,
                &features,
                entry.group.as_str(),
                &entry.name,
                dep_index,
            )? {
                continue;
            }

            let Some(dep_entry) =
                parse_dependency_target(dep.dep(), entry.group, &entry.name, &source)
            else {
                continue;
            };

            if !template_exists(&dep_entry, &mut template_cache) {
                println!(
                    "WARN Missing {} template for dependency '{}': '{}' (from {})",
                    dep_entry.group.label(),
                    entry.name,
                    dep.dep(),
                    source
                );
                continue;
            }

            let required_features = dep.required_features().cloned().unwrap_or_default();
            let changed = ensure_entry_with_features(
                &dep_entry,
                Some(&required_features),
                &mut components,
                &mut utils,
                &mut changes,
            )?;

            if changed {
                processed.remove(&dep_entry);
            }

            if !processed.contains(&dep_entry) {
                queue.push_back(dep_entry);
            }
        }
    }

    if changes.is_empty() {
        println!(
            "No config updates needed for component '{}'.",
            args.component_name
        );
        return Ok(());
    }

    apply_config_changes(&mut doc, &changes, &components, &utils)?;
    fs::write(&config_path, doc.to_string()).map_err(|e| {
        anyhow::anyhow!(
            "Failed to write updated config to {}: {}",
            config_path.display(),
            e
        )
    })?;

    print_add_summary(&config_path, &changes);
    Ok(())
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum EntryGroup {
    Components,
    Utils,
}

impl EntryGroup {
    fn as_str(self) -> &'static str {
        match self {
            EntryGroup::Components => "components",
            EntryGroup::Utils => "utils",
        }
    }

    fn label(self) -> &'static str {
        match self {
            EntryGroup::Components => "component",
            EntryGroup::Utils => "util",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct EntryKey {
    group: EntryGroup,
    name: String,
}

impl EntryKey {
    fn new(group: EntryGroup, name: String) -> Self {
        Self { group, name }
    }
}

#[derive(Default)]
struct TemplateCache {
    components: HashMap<String, bool>,
    utils: HashMap<String, bool>,
}

#[derive(Default)]
struct ConfigChanges {
    added_components: HashSet<String>,
    added_utils: HashSet<String>,
    component_features: HashMap<String, HashMap<String, bool>>,
    util_features: HashMap<String, HashMap<String, bool>>,
}

impl ConfigChanges {
    fn record_feature(&mut self, group: EntryGroup, name: &str, feature: &str, value: bool) {
        let target = match group {
            EntryGroup::Components => &mut self.component_features,
            EntryGroup::Utils => &mut self.util_features,
        };

        target
            .entry(name.to_string())
            .or_default()
            .insert(feature.to_string(), value);
    }

    fn record_new_entry(&mut self, group: EntryGroup, name: &str) {
        match group {
            EntryGroup::Components => {
                self.added_components.insert(name.to_string());
            }
            EntryGroup::Utils => {
                self.added_utils.insert(name.to_string());
            }
        }
    }

    fn is_empty(&self) -> bool {
        self.added_components.is_empty()
            && self.added_utils.is_empty()
            && self.component_features.is_empty()
            && self.util_features.is_empty()
    }
}

fn template_exists(entry: &EntryKey, cache: &mut TemplateCache) -> bool {
    let target = match entry.group {
        EntryGroup::Components => &mut cache.components,
        EntryGroup::Utils => &mut cache.utils,
    };

    if let Some(exists) = target.get(&entry.name) {
        return *exists;
    }

    let exists = match entry.group {
        EntryGroup::Components => templates::list_component_template_files(&entry.name).is_ok(),
        EntryGroup::Utils => templates::list_util_template_files(&entry.name).is_ok(),
    };

    target.insert(entry.name.clone(), exists);
    exists
}

fn parse_dependency_target(
    dep_path: &str,
    entry_group: EntryGroup,
    entry_name: &str,
    source: &str,
) -> Option<EntryKey> {
    const COMPONENT_PREFIX: &str = "copy-ui/components/";
    const UTIL_PREFIX: &str = "copy-ui/utils/";

    if let Some(dep_component) = dep_path.strip_prefix(COMPONENT_PREFIX) {
        if entry_group == EntryGroup::Components && dep_component == entry_name {
            return None;
        }

        return Some(EntryKey::new(
            EntryGroup::Components,
            dep_component.to_string(),
        ));
    }

    if let Some(dep_util) = dep_path.strip_prefix(UTIL_PREFIX) {
        if entry_group == EntryGroup::Utils && dep_util == entry_name {
            return None;
        }

        return Some(EntryKey::new(EntryGroup::Utils, dep_util.to_string()));
    }

    println!(
        "WARN Invalid dependency format for '{}': '{}' (from {}; expected copy-ui/components/<Name> or copy-ui/utils/<Name>)",
        entry_name, dep_path, source
    );
    None
}

fn ensure_entry_with_features(
    entry: &EntryKey,
    required_features: Option<&HashMap<String, bool>>,
    components: &mut HashMap<String, config::ComponentConfig>,
    utils: &mut HashMap<String, config::ComponentConfig>,
    changes: &mut ConfigChanges,
) -> anyhow::Result<bool> {
    let target_map = match entry.group {
        EntryGroup::Components => components,
        EntryGroup::Utils => utils,
    };

    let empty_features = HashMap::new();
    let required_features = required_features.unwrap_or(&empty_features);

    if !target_map.contains_key(&entry.name) {
        target_map.insert(
            entry.name.clone(),
            config::ComponentConfig {
                features: required_features.clone(),
            },
        );
        changes.record_new_entry(entry.group, &entry.name);
        return Ok(true);
    }

    let entry_config = target_map
        .get_mut(&entry.name)
        .ok_or_else(|| anyhow::anyhow!("Missing config for {}", entry.name))?;

    let mut changed = false;

    for (feature_name, expected) in required_features {
        if let Some(actual) = entry_config.features.get(feature_name) {
            if actual != expected {
                anyhow::bail!(
                    "Invalid config: dependency requires [{}.{}.features.{}] = {} but current config has {}.",
                    entry.group.as_str(),
                    entry.name,
                    feature_name,
                    expected,
                    actual
                );
            }
        } else {
            entry_config
                .features
                .insert(feature_name.clone(), *expected);
            changes.record_feature(entry.group, &entry.name, feature_name, *expected);
            changed = true;
        }
    }

    Ok(changed)
}

fn apply_config_changes(
    doc: &mut DocumentMut,
    changes: &ConfigChanges,
    components: &HashMap<String, config::ComponentConfig>,
    utils: &HashMap<String, config::ComponentConfig>,
) -> anyhow::Result<()> {
    apply_group_changes(
        doc,
        "components",
        &changes.added_components,
        &changes.component_features,
        components,
    )?;
    apply_group_changes(
        doc,
        "utils",
        &changes.added_utils,
        &changes.util_features,
        utils,
    )?;
    Ok(())
}

fn apply_group_changes(
    doc: &mut DocumentMut,
    group_key: &str,
    added_entries: &HashSet<String>,
    feature_changes: &HashMap<String, HashMap<String, bool>>,
    entries: &HashMap<String, config::ComponentConfig>,
) -> anyhow::Result<()> {
    if added_entries.is_empty() && feature_changes.is_empty() {
        return Ok(());
    }

    let group_table = ensure_root_table(doc, group_key)?;

    let mut added_names = added_entries.iter().collect::<Vec<_>>();
    added_names.sort();

    for name in added_names {
        let entry_table = ensure_entry_table(group_table, group_key, name)?;
        if let Some(entry_config) = entries.get(name.as_str()) {
            if !entry_config.features.is_empty() {
                set_features(entry_table, group_key, name, &entry_config.features)?;
            }
        }
    }

    let mut feature_names = feature_changes.keys().collect::<Vec<_>>();
    feature_names.sort();

    for name in feature_names {
        let entry_table = ensure_entry_table(group_table, group_key, name)?;
        let features_table = ensure_features_table(entry_table, group_key, name)?;
        let mut feature_keys = feature_changes
            .get(name.as_str())
            .map(|features| features.keys().collect::<Vec<_>>())
            .unwrap_or_default();
        feature_keys.sort();

        for feature_key in feature_keys {
            let feature_value = feature_changes
                .get(name.as_str())
                .and_then(|features| features.get(feature_key.as_str()))
                .copied()
                .unwrap_or(false);
            features_table[feature_key] = value(feature_value);
        }
    }

    Ok(())
}

fn ensure_root_table<'a>(doc: &'a mut DocumentMut, key: &str) -> anyhow::Result<&'a mut Table> {
    if !doc.as_table().contains_key(key) {
        doc[key] = Item::Table(Table::new());
    }

    doc[key]
        .as_table_mut()
        .ok_or_else(|| anyhow::anyhow!("{} must be a table", key))
}

fn ensure_entry_table<'a>(
    table: &'a mut Table,
    group_key: &str,
    name: &str,
) -> anyhow::Result<&'a mut Table> {
    if !table.contains_key(name) {
        table[name] = Item::Table(Table::new());
    }

    table[name]
        .as_table_mut()
        .ok_or_else(|| anyhow::anyhow!("{}.{} must be a table", group_key, name))
}

fn ensure_features_table<'a>(
    entry_table: &'a mut Table,
    group_key: &str,
    name: &str,
) -> anyhow::Result<&'a mut Table> {
    if !entry_table.contains_key("features") {
        entry_table["features"] = Item::Table(Table::new());
    }

    entry_table["features"].as_table_mut().ok_or_else(|| {
        anyhow::anyhow!(
            "{}.{}.features must be a table",
            group_key,
            name
        )
    })
}

fn set_features(
    entry_table: &mut Table,
    group_key: &str,
    name: &str,
    features: &HashMap<String, bool>,
) -> anyhow::Result<()> {
    if features.is_empty() {
        return Ok(());
    }

    let features_table = ensure_features_table(entry_table, group_key, name)?;
    let mut feature_keys = features.keys().collect::<Vec<_>>();
    feature_keys.sort();

    for feature_key in feature_keys {
        let feature_value = features
            .get(feature_key.as_str())
            .copied()
            .unwrap_or(false);
        features_table[feature_key] = value(feature_value);
    }

    Ok(())
}

fn print_add_summary(config_path: &Path, changes: &ConfigChanges) {
    println!("Updated {}", config_path.display());

    let mut added_components = changes.added_components.iter().collect::<Vec<_>>();
    added_components.sort();
    for name in added_components {
        println!("Added component config: {}", name);
    }

    let mut added_utils = changes.added_utils.iter().collect::<Vec<_>>();
    added_utils.sort();
    for name in added_utils {
        println!("Added util config: {}", name);
    }

    let mut component_features = changes.component_features.keys().collect::<Vec<_>>();
    component_features.sort();
    for name in component_features {
        if let Some(features) = changes.component_features.get(name.as_str()) {
            let mut feature_names = features.keys().collect::<Vec<_>>();
            feature_names.sort();
            for feature_name in feature_names {
                let value = features
                    .get(feature_name.as_str())
                    .copied()
                    .unwrap_or(false);
                println!(
                    "Added component feature: {}.{} = {}",
                    name, feature_name, value
                );
            }
        }
    }

    let mut util_features = changes.util_features.keys().collect::<Vec<_>>();
    util_features.sort();
    for name in util_features {
        if let Some(features) = changes.util_features.get(name.as_str()) {
            let mut feature_names = features.keys().collect::<Vec<_>>();
            feature_names.sort();
            for feature_name in feature_names {
                let value = features
                    .get(feature_name.as_str())
                    .copied()
                    .unwrap_or(false);
                println!("Added util feature: {}.{} = {}", name, feature_name, value);
            }
        }
    }
}
