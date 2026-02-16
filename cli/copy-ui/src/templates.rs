use include_dir::{include_dir, Dir};

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
