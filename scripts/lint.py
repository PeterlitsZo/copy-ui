import subprocess
import json
    
def main():
    check_ast_grep_exists()
    check_no_theme_provider()
    
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
        "scripts/etc/no-theme-provider.yaml",
        "--json",       
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    result = json.loads(result.stdout)
    for match in result:
        print(f"WARN import deprecated ThemeProvider in {match['file']}.")

if __name__ == "__main__":
    main()