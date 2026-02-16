use include_dir::{include_dir, Dir};
use std::path::Path;

static TP_DIR: Dir<'_> = include_dir!("tp");

fn get_tp_file(kind: &str, name: &str, filename: &str) -> anyhow::Result<&'static str> {
    let path = format!("{}/{}/{}", kind, name, filename);
    let file = TP_DIR
        .get_file(&path)
        .ok_or_else(|| anyhow::anyhow!("Template file not found: {}", path))?;

    file.contents_utf8()
        .ok_or_else(|| anyhow::anyhow!("Template file is not valid UTF-8: {}", path))
}

pub fn get_component_index_template(component_name: &str) -> anyhow::Result<&'static str> {
    get_tp_file("components", component_name, "index.j2")
}

pub fn get_component_file_template(
    component_name: &str,
    filename: &str,
) -> anyhow::Result<&'static str> {
    let template_filename = format!("{}.j2", filename);
    get_tp_file("components", component_name, &template_filename)
}

pub fn get_util_index_template(util_name: &str) -> anyhow::Result<&'static str> {
    get_tp_file("utils", util_name, "index.j2")
}

pub fn get_util_file_template(util_name: &str, filename: &str) -> anyhow::Result<&'static str> {
    let template_filename = format!("{}.j2", filename);
    get_tp_file("utils", util_name, &template_filename)
}

pub fn list_component_template_files(component_name: &str) -> anyhow::Result<Vec<String>> {
    list_template_files("components", component_name)
}

pub fn list_util_template_files(util_name: &str) -> anyhow::Result<Vec<String>> {
    list_template_files("utils", util_name)
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

        if relative_path == Path::new("index.j2") {
            continue;
        }

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
