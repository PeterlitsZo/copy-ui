use crate::config;
use crate::templates;
use minijinja::{context, Environment};
use std::collections::HashMap;

pub fn validate_dependencies(config: &config::Config) -> anyhow::Result<()> {
    let mut component_names: Vec<&str> = config.components.keys().map(String::as_str).collect();
    component_names.sort_unstable();

    for component_name in component_names {
        let Some(component_config) = config.components.get(component_name) else {
            continue;
        };

        let metadata = templates::get_component_metadata(component_name)?;
        let Some(metadata) = metadata else {
            continue;
        };

        for (dep_index, dep) in metadata.deps.iter().enumerate() {
            if !should_apply_dependency(
                dep,
                &component_config.features,
                "components",
                component_name,
                dep_index,
            )? {
                continue;
            }

            validate_dependency(
                config,
                dep,
                "components",
                component_name,
                &format!("tp/components/{}/_metadata.yaml", component_name),
            )?;
        }
    }

    let mut util_names: Vec<&str> = config.utils.keys().map(String::as_str).collect();
    util_names.sort_unstable();

    for util_name in util_names {
        let Some(util_config) = config.utils.get(util_name) else {
            continue;
        };

        let metadata = templates::get_util_metadata(util_name)?;
        let Some(metadata) = metadata else {
            continue;
        };

        for (dep_index, dep) in metadata.deps.iter().enumerate() {
            if !should_apply_dependency(
                dep,
                &util_config.features,
                "utils",
                util_name,
                dep_index,
            )? {
                continue;
            }

            validate_dependency(
                config,
                dep,
                "utils",
                util_name,
                &format!("tp/utils/{}/_metadata.yaml", util_name),
            )?;
        }
    }

    Ok(())
}

pub fn should_apply_dependency(
    dep: &templates::DependencyRule,
    entry_features: &HashMap<String, bool>,
    entry_group: &str,
    entry_name: &str,
    dep_index: usize,
) -> anyhow::Result<bool> {
    let Some(condition) = dep.when() else {
        return Ok(true);
    };

    let condition = condition.trim();
    if condition.is_empty() {
        return Ok(true);
    }

    let mut env = Environment::new();
    env.set_trim_blocks(true);
    env.set_lstrip_blocks(true);
    env.set_keep_trailing_newline(true);

    let template_source = format!("{{% if {} %}}true{{% else %}}false{{% endif %}}", condition);
    let template_name = format!(
        "metadata-dep-when/{}/{}/deps[{}]",
        entry_group, entry_name, dep_index
    );

    let ctx = context! {
        features => entry_features,
    };

    let rendered = env
        .render_named_str(&template_name, &template_source, ctx)
        .map_err(|e| {
            anyhow::anyhow!(
                "Failed to evaluate dependency condition '{}' in tp/{}/{}/_metadata.yaml deps[{}].when: {}",
                condition,
                entry_group,
                entry_name,
                dep_index,
                e
            )
        })?;

    match rendered.trim() {
        "true" => Ok(true),
        "false" => Ok(false),
        value => Err(anyhow::anyhow!(
            "Invalid dependency condition result '{}' in tp/{}/{}/_metadata.yaml deps[{}].when",
            value,
            entry_group,
            entry_name,
            dep_index
        )),
    }
}

fn validate_dependency(
    config: &config::Config,
    dep: &templates::DependencyRule,
    entry_group: &str,
    entry_name: &str,
    source: &str,
) -> anyhow::Result<()> {
    const COMPONENT_PREFIX: &str = "copy-ui/components/";
    const UTIL_PREFIX: &str = "copy-ui/utils/";
    let dep_path = dep.dep();

    if let Some(dep_component) = dep_path.strip_prefix(COMPONENT_PREFIX) {
        if dep_component == entry_name {
            return Ok(());
        }

        let Some(dep_component_config) = config.components.get(dep_component) else {
            println!(
                "WARN Missing component dependency for '{}': '{}' (from {})",
                entry_name, dep_path, source
            );
            return Ok(());
        };

        if let Some(required_features) = dep.required_features() {
            validate_required_features(
                required_features,
                &dep_component_config.features,
                entry_group,
                entry_name,
                "components",
                dep_component,
                source,
            )?;
        }

        return Ok(());
    }

    if let Some(dep_util) = dep_path.strip_prefix(UTIL_PREFIX) {
        let Some(dep_util_config) = config.utils.get(dep_util) else {
            println!(
                "WARN Missing util dependency for '{}': '{}' (from {})",
                entry_name, dep_path, source
            );
            return Ok(());
        };

        if let Some(required_features) = dep.required_features() {
            validate_required_features(
                required_features,
                &dep_util_config.features,
                entry_group,
                entry_name,
                "utils",
                dep_util,
                source,
            )?;
        }

        return Ok(());
    }

    println!(
        "WARN Invalid dependency format for '{}': '{}' (from {}; expected copy-ui/components/<Name> or copy-ui/utils/<Name>)",
        entry_name, dep_path, source
    );

    Ok(())
}

fn validate_required_features(
    required_features: &std::collections::HashMap<String, bool>,
    actual_features: &std::collections::HashMap<String, bool>,
    entry_group: &str,
    entry_name: &str,
    dep_group: &str,
    dep_name: &str,
    source: &str,
) -> anyhow::Result<()> {
    let mut required_feature_names = required_features.keys().cloned().collect::<Vec<_>>();
    required_feature_names.sort();

    for feature_name in required_feature_names {
        let expected = required_features
            .get(&feature_name)
            .copied()
            .unwrap_or(false);
        let actual = actual_features.get(&feature_name).copied().unwrap_or(false);

        if actual != expected {
            anyhow::bail!(
                "Invalid config: [{}.{}] requires [{}.{}.features.{}] = {} (declared in {}).",
                entry_group,
                entry_name,
                dep_group,
                dep_name,
                feature_name,
                expected,
                source
            );
        }
    }

    Ok(())
}
