import os
from typing import TextIO
import json

def main():
    codegen()

def codegen():
    """
    Reads all component directories under `src/components`, and converts their
    file contents into a TypeScript file (with suffix `.codegen.ts`), etc.
    """

    # The script is in the 'scripts' directory. We need to go up one level to
    # the project root.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    components_dir = os.path.join(project_root, 'src', 'components')
    output_dir = os.path.join(project_root, 'app', 'routes', 'components')
    
    if not os.path.exists(components_dir):
        print(f"Error: Components directory not found at {repr(components_dir)}")
        return

    # List of all component names.        
    components = []

    for component_name in os.listdir(components_dir):
        component_dir_path = os.path.join(components_dir, component_name)

        # Make sure the component is not private.
        config_path = os.path.join(component_dir_path, '.copy_ui_config.toml')
        if os.path.isfile(config_path):
            with open(config_path, 'r', encoding='utf-8') as cf:
                config_content = cf.read()
                if 'private = true' in config_content:
                    continue

        # Add to the list of components.
        components.append(component_name)

        # Code generation for `source_code.codegen.ts`.
        source_code_codegen_filename = "source_code.codegen.ts"
        if os.path.isdir(component_dir_path):
            # Make sure the output file directory exists.
            output_file_path = os.path.join(output_dir, component_name, source_code_codegen_filename)
            if not os.path.exists(os.path.dirname(output_file_path)):
                os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

            # Code generation for this component.
            with open(output_file_path, 'w', encoding='utf-8') as of:
                codegen_for_component(component_dir_path, of)

        # Code generation for `Demo_source_code.codegen.ts`.
        demo_source_code_codegen_filename = "Demo_source_code.codegen.ts"
        demo_source_file_path = os.path.join(output_dir, component_name, 'Demo.tsx')
        if os.path.isfile(demo_source_file_path):
            output_demo_file_path = os.path.join(output_dir, component_name, demo_source_code_codegen_filename)
            with open(output_demo_file_path, 'w', encoding='utf-8') as of:
                with open(demo_source_file_path, 'r', encoding='utf-8') as df:
                    demo_content = df.read()
                    of.write("export const demoSourceCode = ''\n")
                    for line in demo_content.splitlines():
                        line += '\n'
                        of.write(f"  + {repr(line)}\n")
                    of.write("  ;\n")

        # Code generation for `CHANGELOG.md`.
        changelog_codegen_filename = 'changelog.codegen.ts'
        changelog_path = os.path.join(component_dir_path, 'CHANGELOG.md')
        if os.path.isfile(changelog_path):
            output_changelog_file_path = os.path.join(output_dir, component_name, changelog_codegen_filename)
            with open(output_changelog_file_path, 'w', encoding='utf-8') as of:
                with open(changelog_path, 'r', encoding='utf-8') as cf:
                    changelog_content = cf.read()
                    of.write("export const changelog = ''\n")
                    for line in changelog_content.splitlines():
                        line += '\n'
                        of.write(f"  + {repr(line)}\n")
                    of.write("  ;\n")

    # Sort components alphabetically.
    components.sort()

    # Code generation for `src/components/Navbar/components.codegen.ts`.
    navbar_components_codegen_path = os.path.join(project_root, 'src', 'components', 'Navbar', 'components.codegen.ts')
    if not os.path.exists(os.path.dirname(navbar_components_codegen_path)):
        os.makedirs(os.path.dirname(navbar_components_codegen_path), exist_ok=True)
    with open(navbar_components_codegen_path, 'w', encoding='utf-8') as of:
        of.write("export const components: { name: string, path: string }[] = [\n")
        for component_name in components:
            nav_data = {
                'name': component_name,
                'path': f"/components/{component_name}"
            }
            nav_data_json = json.dumps(nav_data)
            of.write(f"  {nav_data_json},\n")
        of.write("];\n")

def codegen_for_component(component_dir_path: str, of: TextIO):
    """
    Generates the codegen file for a specific component.
    """
    of.write("export const sourceCode: Record<string, string> = {};\n\n")

    # Load all files and write into the `components_data` dictionary.
    for filename in os.listdir(component_dir_path):
        if filename == ".copy_ui_config.toml" or filename == "CHANGELOG.md":
            continue

        file_path = os.path.join(component_dir_path, filename)
        if os.path.isfile(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    filecontent = f.read()

                of.write(f"sourceCode['{filename}'] = ''\n")
                for line in filecontent.splitlines():
                    line += '\n'
                    of.write(f"  + {repr(line)}\n")
                of.write("  ;\n\n")
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")

if __name__ == '__main__':
    main()
