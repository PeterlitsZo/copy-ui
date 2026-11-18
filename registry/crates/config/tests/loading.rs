use std::{
    fs,
    path::PathBuf,
    sync::atomic::{AtomicU64, Ordering},
};

use copy_ui_registry_config::{Config, DatabaseConfig};

static NEXT_ID: AtomicU64 = AtomicU64::new(0);

struct ConfigFile(PathBuf);

impl ConfigFile {
    fn new(contents: Option<&str>) -> Self {
        let directory = std::env::temp_dir().join(format!(
            "copy-ui-registry-config-{}-{}",
            std::process::id(),
            NEXT_ID.fetch_add(1, Ordering::Relaxed)
        ));
        fs::create_dir(&directory).unwrap();
        let path = directory.join("config.toml");
        if let Some(contents) = contents {
            fs::write(&path, contents).unwrap();
        }
        Self(path)
    }

    fn load(&self) -> copy_ui_registry_config::ConfigResult<Config> {
        Config::from_file(self.0.to_str().unwrap())
    }
}

impl Drop for ConfigFile {
    fn drop(&mut self) {
        let _ = fs::remove_dir_all(self.0.parent().unwrap());
    }
}

#[test]
fn loads_postgresql_configuration() {
    let file = ConfigFile::new(Some(
        r#"
[infra.database]
type = "PostgreSql"
connection_address = "host=localhost user=registry"
"#,
    ));
    let config = file.load().unwrap();
    let DatabaseConfig::PostgreSql(database) = config.infra.database;
    assert_eq!(database.connection_address, "host=localhost user=registry");
}

#[test]
fn rejects_missing_connection_address() {
    let file = ConfigFile::new(Some("[infra.database]\ntype = \"PostgreSql\"\n"));
    let error = file.load().unwrap_err().to_string();
    assert!(error.contains("deserialize config"), "{error}");
    assert!(error.contains("connection_address"), "{error}");
}

#[test]
fn rejects_unknown_database_type() {
    let file = ConfigFile::new(Some("[infra.database]\ntype = \"Unknown\"\n"));
    let error = file.load().unwrap_err().to_string();
    assert!(error.contains("deserialize config"), "{error}");
    assert!(error.contains("unknown variant"), "{error}");
}

#[test]
fn reports_missing_file_with_source() {
    let file = ConfigFile::new(None);
    let error = file.load().unwrap_err();
    assert!(error.to_string().contains("read config"));
    assert!(std::error::Error::source(&error).is_some());
}
