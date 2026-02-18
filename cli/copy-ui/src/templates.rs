use include_dir::{include_dir, Dir};
use serde::Deserialize;
use std::path::Path;

static TP_DIR: Dir<'_> = include_dir!("tp");

#[derive(Debug, Clone, Deserialize, Default)]
pub struct EntryMetadata {
    #[serde(default)]
    pub current: CurrentRelease,

    #[serde(default)]
    pub deps: Vec<String>,

    #[serde(default)]
    pub files: Vec<FileRule>,

    #[serde(default)]
    pub changelog: Vec<ChangelogEntry>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CurrentRelease {
    #[serde(default = "default_version")]
    pub version: String,

    #[serde(default = "default_date")]
    pub date: String,
}

impl Default for CurrentRelease {
    fn default() -> Self {
        Self {
            version: default_version(),
            date: default_date(),
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct FileRule {
    #[serde(rename = "filename", alias = "file")]
    pub filename: String,

    #[serde(default)]
    pub when: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ChangelogEntry {
    pub version: String,
    pub date: String,
    #[serde(rename = "desc", alias = "text")]
    pub desc: String,
}

fn default_version() -> String {
    "0.1.0".to_string()
}

fn default_date() -> String {
    "1970-01-01".to_string()
}

fn get_tp_file(kind: &str, name: &str, filename: &str) -> anyhow::Result<&'static str> {
    let path = format!("{}/{}/{}", kind, name, filename);
    let file = TP_DIR
        .get_file(&path)
        .ok_or_else(|| anyhow::anyhow!("Template file not found: {}", path))?;

    file.contents_utf8()
        .ok_or_else(|| anyhow::anyhow!("Template file is not valid UTF-8: {}", path))
}

fn get_optional_tp_file(
    kind: &str,
    name: &str,
    filename: &str,
) -> anyhow::Result<Option<&'static str>> {
    let path = format!("{}/{}/{}", kind, name, filename);
    let Some(file) = TP_DIR.get_file(&path) else {
        return Ok(None);
    };

    let content = file
        .contents_utf8()
        .ok_or_else(|| anyhow::anyhow!("Template file is not valid UTF-8: {}", path))?;

    Ok(Some(content))
}

pub fn get_component_file_template(
    component_name: &str,
    filename: &str,
) -> anyhow::Result<&'static str> {
    let template_filename = format!("{}.j2", filename);
    get_tp_file("components", component_name, &template_filename)
}

pub fn get_component_metadata(component_name: &str) -> anyhow::Result<Option<EntryMetadata>> {
    get_metadata("components", component_name)
}

pub fn get_util_file_template(util_name: &str, filename: &str) -> anyhow::Result<&'static str> {
    let template_filename = format!("{}.j2", filename);
    get_tp_file("utils", util_name, &template_filename)
}

pub fn get_util_metadata(util_name: &str) -> anyhow::Result<Option<EntryMetadata>> {
    get_metadata("utils", util_name)
}

pub fn list_component_template_files(component_name: &str) -> anyhow::Result<Vec<String>> {
    list_template_files("components", component_name)
}

pub fn list_util_template_files(util_name: &str) -> anyhow::Result<Vec<String>> {
    list_template_files("utils", util_name)
}

fn get_metadata(kind: &str, name: &str) -> anyhow::Result<Option<EntryMetadata>> {
    let Some(metadata_content) = get_optional_tp_file(kind, name, "_metadata.yaml")? else {
        return Ok(None);
    };

    let metadata: EntryMetadata = serde_yaml::from_str(metadata_content).map_err(|e| {
        anyhow::anyhow!(
            "Failed to parse template metadata for {}/{} from _metadata.yaml: {}",
            kind,
            name,
            e
        )
    })?;

    Ok(Some(metadata))
}

fn list_template_files(kind: &str, name: &str) -> anyhow::Result<Vec<String>> {
    let base_path = format!("{}/{}", kind, name);
    let dir = TP_DIR
        .get_dir(&base_path)
        .ok_or_else(|| anyhow::anyhow!("Template directory not found: {}", base_path))?;

    let mut files = Vec::new();
    collect_template_files(dir, Path::new(&base_path), &mut files)?;

    files.sort();
    Ok(files)
}

fn collect_template_files(
    dir: &Dir,
    base_path: &Path,
    files: &mut Vec<String>,
) -> anyhow::Result<()> {
    for file in dir.files() {
        let full_path = file.path();
        let relative_path = full_path.strip_prefix(base_path).map_err(|e| {
            anyhow::anyhow!(
                "Failed to strip template base path '{}' from '{}': {}",
                base_path.display(),
                full_path.display(),
                e
            )
        })?;

        let relative = relative_path.to_string_lossy();
        if let Some(template_path) = relative.strip_suffix(".j2") {
            files.push(template_path.to_string());
        }
    }

    for child_dir in dir.dirs() {
        collect_template_files(child_dir, base_path, files)?;
    }

    Ok(())
}
