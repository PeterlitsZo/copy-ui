import subprocess
import json
    
def main():
    check_ast_grep_exists()
    
    # Make sure no deprecated `ThemeProvider` is used.
    check_no_theme_provider()
    
    # Make sure no deprecated `Typography.Root` is used.
    check_no_typography_root()

    # Make sure no deprecated `resolveStyle` is used.
    check_no_resolve_style()
    
    # Make sure no deprecated `InputBase` is used.
    check_no_input_base()

def check_ast_grep_exists():
    try:
        subprocess.run(["ast-grep", "--version"], check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: ast-grep is not installed or not found in PATH.")
        print("Please install ast-grep from https://ast-grep.github.io/")
        exit(1)

def check_no_theme_provider():
    cmd = [
        "ast-grep",
        "scan",
        "--rule",
        "scripts/etc/find-theme-provider.yaml",
        "--json",       
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    result = json.loads(result.stdout)
    for match in result:
        print(f"WARN import deprecated ThemeProvider in {match['file']}.")

def check_no_typography_root():
    cmd = [
        "ast-grep",
        "scan",
        "--rule",
        "scripts/etc/find-typography-root.yaml",
        "--json",       
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    result = json.loads(result.stdout)
    for match in result:
        print(f"WARN use deprecated Typography.Root component in {match['file']} -- Please just use Typography.")
        
def check_no_resolve_style():
    cmd = [
        "ast-grep",
        "scan",
        "--rule",
        "scripts/etc/find-resolve-style.yaml",
        "--json",       
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    result = json.loads(result.stdout)
    for match in result:
        print(f"WARN use deprecated resolveStyle function in {match['file']} -- Please just use resolveStyle2.")
        
def check_no_input_base():
    cmd = [
        "ast-grep",
        "scan",
        "--rule",
        "scripts/etc/find-input-base.yaml",
        "--json",       
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    result = json.loads(result.stdout)
    for match in result:
        print(f"WARN use deprecated InputBase component in {match['file']} -- Please just use IbsBase.")

if __name__ == "__main__":
    main()