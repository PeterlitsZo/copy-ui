use std::path::{Path, PathBuf};

pub fn to_absolute_path(pwd: &Path, path: &Path) -> PathBuf {
    if path.is_absolute() {
        path.to_path_buf()
    } else {
        pwd.join(path)
    }
}
