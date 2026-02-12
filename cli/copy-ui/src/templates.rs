use include_dir::{include_dir, Dir};

static TP_DIR: Dir<'_> = include_dir!("tp");

fn get_tp_file(component_name: &str, filename: &str) -> anyhow::Result<&'static str> {
    let path = format!("components/{}/{}", component_name, filename);
    let file = TP_DIR
        .get_file(&path)
        .ok_or_else(|| anyhow::anyhow!("Template file not found: {}", path))?;
    
    file.contents_utf8()
        .ok_or_else(|| anyhow::anyhow!("Template file is not valid UTF-8: {}", path))
}

pub fn get_component_index_template(component_name: &str) -> anyhow::Result<&'static str> {
    get_tp_file(component_name, "index.j2")
}

pub fn get_component_file_template(
    component_name: &str,
    filename: &str,
) -> anyhow::Result<&'static str> {
    let template_filename = format!("{}.j2", filename);
    get_tp_file(component_name, &template_filename)
}
