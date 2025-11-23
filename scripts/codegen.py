import os
from typing import TextIO, List, TypedDict
import json
from pathlib import Path

def main():
    codegen_component()
    codegen_utils()

def codegen_component():
    """Reads all component directories under `src/components`, and converts their
    file contents into a TypeScript file (with suffix `.codegen.ts`), etc.
    """
    # The script is in the 'scripts' directory. We need to go up one level to
    # the project root.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    components_dir = os.path.join(project_root, 'src', 'components')
    components_route_dir = os.path.join(project_root, 'app', 'routes', 'components')
    
    if not os.path.exists(components_dir):
        print(f"Error: Components directory not found at {repr(components_dir)}")
        return

    # List of all component names.        
    class ComponentInfo(TypedDict):
        name: str
        wip: bool
        deprecated: bool
    components: List[ComponentInfo] = []

    for component_name in os.listdir(components_dir):
        component_dir_path = os.path.join(components_dir, component_name)
        component_route_dir_path = os.path.join(components_route_dir, component_name)

        # Default config's flags.
        wip = False
        deprecated = False
        private = False

        # Read the component config file, if exists.
        config_paths = [
            os.path.join(component_dir_path, '.copy_ui_config.toml'),
            os.path.join(component_dir_path, '.copy-ui-config.toml'),
        ]
        for config_path in config_paths:
            if os.path.isfile(config_path):
                with open(config_path, 'r', encoding='utf-8') as cf:
                    config_content = cf.read()
                    if 'private = true' in config_content:
                        private = True
                    if 'wip = true' in config_content:
                        wip = True
                    if 'deprecated = true' in config_content:
                        deprecated = True
                break
            
        # Skip private components.
        if private:
            continue

        # Add to the list of components.
        components.append({
            "name": component_name,
            "wip": wip,
            "deprecated": deprecated
        })

        # Code generation for `source_code.codegen.ts`.
        source_code_codegen_filename = "source_code.codegen.ts"
        if os.path.isdir(component_dir_path):
            # Make sure the output file directory exists.
            output_file_path = os.path.join(component_route_dir_path, source_code_codegen_filename)
            if not os.path.exists(os.path.dirname(output_file_path)):
                os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

            # Code generation for this component.
            with open(output_file_path, 'w', encoding='utf-8') as of:
                codegen_source_code_for_component(component_dir_path, of)

        # Code generation for `Demo_source_code.codegen.ts`.
        codegen_demo_for_component(component_name, component_route_dir_path)

        # Code generation for `CHANGELOG.md`.
        changelog_codegen_filename = 'changelog.codegen.ts'
        if os.path.isdir(component_dir_path):
            # Make sure the output file directory exists.
            if not os.path.exists(component_route_dir_path):
                os.makedirs(component_route_dir_path, exist_ok=True)

            # Code generation for this component.
            with open(os.path.join(component_route_dir_path, changelog_codegen_filename), 'w', encoding='utf-8') as of:
                codegen_changelog_for_component(component_dir_path, of)

        # Code generation for default `index.tsx` if it doesn't exist.
        index_tsx_path = os.path.join(component_route_dir_path, 'index.tsx')
        if not os.path.exists(index_tsx_path):
            # Make sure the output file directory exists.
            if not os.path.exists(component_route_dir_path):
                os.makedirs(component_route_dir_path, exist_ok=True)
            
            # Generate default index.tsx.
            with open(index_tsx_path, 'w', encoding='utf-8') as of:
                codegen_default_index_tsx(component_name, of)

    # Sort components alphabetically.
    components.sort(key=lambda x: x['name'].lower())

    # Code generation for `src/components/Navbar/components.codegen.ts`.
    navbar_components_codegen_path = os.path.join(project_root, 'src', 'components', 'Navbar', 'components.codegen.ts')
    if not os.path.exists(os.path.dirname(navbar_components_codegen_path)):
        os.makedirs(os.path.dirname(navbar_components_codegen_path), exist_ok=True)
    with open(navbar_components_codegen_path, 'w', encoding='utf-8') as of:
        of.write(get_codegen_header())
        of.write("type Component = { name: string, path: string, wip: boolean, deprecated: boolean };\n\n")
        of.write("export const components: Component[] = [\n")
        for component in components:
            nav_data = {
                'name': component['name'],
                'path': f"/v0/components/{component['name']}",
                'wip': component['wip'],
                'deprecated': component['deprecated'],
            }
            nav_data_json = json.dumps(nav_data)
            of.write(f"  {nav_data_json},\n")
        of.write("];\n")

    # Code generation for `app/components_routes.codegen.ts`.
    app_components_routes_codegen_path = os.path.join(project_root, 'app', 'components_routes.codegen.ts')
    with open(app_components_routes_codegen_path, 'w', encoding='utf-8') as of:
        of.write(get_codegen_header())
        of.write("export const componentsRoutes: { name: string, path: string }[] = [\n")
        for component in components:
            route_data = {
                'name': component['name'],
                'path': f"routes/components/{component['name']}/index.tsx"
            }
            route_data_json = json.dumps(route_data)
            of.write(f"  {route_data_json},\n")
        of.write("];\n")

def codegen_source_code_for_component(component_dir_path: str, of: TextIO):
    """
    Generates the codegen file for a specific component.
    """
    of.write("// This file is auto-generated by `just codegen`.\n")
    of.write("// Do not edit this file directly.\n\n")
    of.write("export const sourceCode: Record<string, string> = {};\n\n")

    # Load all files and write into the `components_data` dictionary.
    ignored_files = {".copy_ui_config.toml", ".copy-ui-config.toml", "CHANGELOG.md"}
    for filename in os.listdir(component_dir_path):
        if filename in ignored_files:
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

def codegen_demo_for_component(component_name: str, component_route_dir_path: str):
    """
    Generates the demo codegen file for a specific component.

    The demo file should be located at `Demo.tsx` or `demos/*.tsx`. If it is
    `Demo.tsx`, a `Demo_source_code.codegen.ts` file will be generated. If it
    is `demos/*.tsx`, a `demos/<original_name>.source_code.codegen.ts` file
    will be generated.
    """
    def codegen_demo_source_code(of: TextIO, demo_content: str, export_default: bool = False):
        of.write("// This file is auto-generated by `just codegen`.\n")
        of.write("// Do not edit this file directly.\n\n")
        if export_default:
            of.write("const demoSourceCode = ''\n")
        else:
            of.write("export const demoSourceCode = ''\n")
        for line in demo_content.splitlines():
            line += '\n'
            of.write(f"  + {repr(line)}\n")
        of.write("  ;\n")
        if export_default:
            of.write("\nexport default demoSourceCode;\n")

    demo_file_path = os.path.join(component_route_dir_path, 'Demo.tsx')
    of_path = os.path.join(component_route_dir_path, 'Demo_source_code.codegen.ts')
    if os.path.isfile(demo_file_path):
        print(f"WARN Find component {component_name} has Demo.tsx to codegen -- which is deprecated, please use `demos/` folder instead.")
        with open(of_path, 'w', encoding='utf-8') as of:
            with open(demo_file_path, 'r', encoding='utf-8') as df:
                demo_content = df.read()
                codegen_demo_source_code(of, demo_content)

    demos_dir_path = os.path.join(component_route_dir_path, 'demos')
    if os.path.isdir(demos_dir_path):
        for filename in os.listdir(demos_dir_path):
            if filename.endswith('.tsx'):
                demo_file_path = os.path.join(demos_dir_path, filename)
                of_filename = f"{os.path.splitext(filename)[0]}.source_code.codegen.ts"
                of_path = os.path.join(demos_dir_path, of_filename)
                with open(of_path, 'w', encoding='utf-8') as of:
                    with open(demo_file_path, 'r', encoding='utf-8') as df:
                        demo_content = df.read()
                        codegen_demo_source_code(of, demo_content, export_default=True)

def codegen_changelog_for_component(component_dir_path: str, of: TextIO):
    """
    Generates the changelog codegen file for a specific component.
    """
    changelog_path = os.path.join(component_dir_path, 'CHANGELOG.md')
    if os.path.isfile(changelog_path):
        with open(changelog_path, 'r', encoding='utf-8') as cf:
            changelog_content = cf.read()
            of.write("// This file is auto-generated by `just codegen`.\n")
            of.write("// Do not edit this file directly.\n\n")
            of.write("export const changelog = ''\n")
            for line in changelog_content.splitlines():
                line += '\n'
                of.write(f"  + {repr(line)}\n")
            of.write("  ;\n")

def codegen_default_index_tsx(component_name: str, of: TextIO):
    """Generates a default index.tsx file for a component route if it doesn't exist."""

    # Convert component name to PascalCase for the page component name
    page_component_name = component_name[0].upper() + component_name[1:] + "Page"
    
    of.write("import { useState } from \"react\";\n\n")
    of.write("import { DocLayout } from \"@/layouts/DocLayout\";\n\n")
    of.write("import type { Route } from \"./+types/index\";\n")
    of.write("import { changelog } from \"./changelog.codegen\";\n")
    of.write("import Doc from \"./doc.mdx\";\n")
    of.write("import { sourceCode } from \"./source_code.codegen\";\n\n")
    of.write("export function meta(_: Route.MetaArgs) {\n")
    of.write("  return [\n")
    of.write(f"    {{ title: \"{component_name} | Copy UI\" }},\n")
    of.write(f"    {{ name: \"description\", content: \"The {component_name} component from Copy UI.\" }},\n")
    of.write("  ];\n")
    of.write("}\n\n")
    of.write(f"export default function {page_component_name}() {{\n")
    of.write("  const [tabsValue, setTabsValue] = useState(\"doc\");\n\n")
    of.write("  const tabs = [\n")
    of.write("    { name: \"doc\", label: \"Document\" },\n")
    of.write("    { name: \"source\", label: \"Source Code\" },\n")
    of.write("    { name: \"changelog\", label: \"Changelog\" },\n")
    of.write("  ];\n\n")
    of.write("  return (\n")
    of.write("    <DocLayout>\n")
    of.write("      <DocLayout.Title\n")
    of.write(f"        title=\"{component_name}\"\n")
    of.write("        desc=\"\"\n")
    of.write("        tabsValue={tabsValue}\n")
    of.write("        tabs={tabs}\n")
    of.write("        onTabsValueChange={setTabsValue}\n")
    of.write("      />\n")
    of.write("      {tabsValue === \"doc\" && (\n")
    of.write("        <DocLayout.Content>\n")
    of.write("          <Doc />\n")
    of.write("        </DocLayout.Content>\n")
    of.write("      )}\n")
    of.write("      {tabsValue === \"source\" && (\n")
    of.write("        <DocLayout.Content variant=\"files\">\n")
    of.write("          <DocLayout.Files files={sourceCode} />\n")
    of.write("        </DocLayout.Content>\n")
    of.write("      )}\n")
    of.write("      {tabsValue === \"changelog\" && (\n")
    of.write("        <DocLayout.Content>\n")
    of.write("          <DocLayout.Changelog changelog={changelog} />\n")
    of.write("        </DocLayout.Content>\n")
    of.write("      )}\n")
    of.write("    </DocLayout>\n")
    of.write("  );\n")
    of.write("}\n")

def codegen_utils():
    """Read all utility files under `src/utils`, and converts their
    file contents into a TypeScript file (with suffix `.codegen.ts`), etc.
    """
    # Get the paths.
    project_root_dir = Path(__file__).parent.parent
    utils_dir = project_root_dir / "src" / "utils"
    app_dir = project_root_dir / "app" / "routes" / "utils"
    
    # The dict for utils routes.
    utils_routes = []

    # Process each `.ts` file in the utils directory.
    for file_path in utils_dir.glob("*.ts"):
        # Append to utils routes.
        utils_routes.append({
            'name': file_path.stem,
            'path': f"routes/utils/{file_path.stem}/index.tsx"
        })
        
        # Codegen for the file.
        codegen_utils_for_file(file_path, app_dir)
        
    # Process each directory in the utils directory.
    for dir_path in utils_dir.glob("*"):
        if dir_path.is_dir():
            # Append to utils routes.
            utils_routes.append({
                'name': dir_path.stem,
                'path': f"routes/utils/{dir_path.stem}/index.tsx"
            })
            
            # Codegen for the directory.
            codegen_utils_for_dir(dir_path, app_dir)
           
    # Codegen for `app/utils-routes.codegen.ts`.
    utils_routes_codegen_path = project_root_dir / "app" / "utils-routes.codegen.ts"
    utils_routes.sort(key=lambda x: x['name'].lower())
    with open(utils_routes_codegen_path, 'w', encoding='utf-8') as of:
        of.write(get_codegen_header())
        of.write("export const utilsRoutes: { name: string, path: string }[] = [\n")
        for route in utils_routes:
            of.write(f"  {json.dumps(route)},\n")
        of.write("];\n")
        
    # Codegen for `src/components/Navbar/utils.codegen.ts`.
    navbar_utils_codegen_path = project_root_dir / "src" / "components" / "Navbar" / "utils.codegen.ts"
    with open(navbar_utils_codegen_path, 'w', encoding='utf-8') as of:
        of.write(get_codegen_header())
        of.write("export const utils: { name: string, path: string }[] = [\n")
        for route in utils_routes:
            nav_data = {
                'name': route['name'],
                'path': f"/v0/utils/{route['name']}"
            }
            of.write(f"  {json.dumps(nav_data)},\n")
        of.write("];\n")

def codegen_utils_for_file(file_path: Path, app_dir: Path):
    """Generates the codegen file for a specific file."""
    
    # Get the path for the codegen file (and make sure its parent exists).
    codegen_file_path = app_dir / file_path.stem / "source-code.codegen.ts"
    (app_dir / file_path.stem).mkdir(parents=True, exist_ok=True)

    # Code generation for the source code file. 
    with open(codegen_file_path, 'w', encoding='utf-8') as of:
        with open(file_path, 'r', encoding='utf-8') as f:
            filecontent = f.read()

        of.write(get_codegen_header())
        of.write(f"const sourceCode = ''\n")
        for line in filecontent.splitlines():
            line += '\n'
            of.write(f"  + {repr(line)}\n")
        of.write("  ;\n\n")

        of.write("export default sourceCode;\n")
        
def codegen_utils_for_dir(dir_path: Path, app_dir: Path):
    """Generates the codegen files for a specific directory."""

    # Get the path for the codegen file (and make sure its parent exists).
    codegen_file_path = app_dir / dir_path.stem / "source-code.codegen.ts"
    (app_dir / dir_path.stem).mkdir(parents=True, exist_ok=True)

    # Code generation for the source code file. 
    with open(codegen_file_path, 'w', encoding='utf-8') as of:
        with open(dir_path / "index.ts", 'r', encoding='utf-8') as f:
            filecontent = f.read()
            
        of.write(get_codegen_header())
        of.write(f"const sourceCode = ''\n")
        for line in filecontent.splitlines():
            line += '\n'
            of.write(f"  + {repr(line)}\n")
        of.write("  ;\n\n")

        of.write("export default sourceCode;\n")
        
    # Codegen for the `CHANGELOG.md` file.
    changelog_file_path = dir_path / "CHANGELOG.md"
    if os.path.isfile(changelog_file_path):
        with open(changelog_file_path, 'r', encoding='utf-8') as f:
            changelog_content = f.read()
            
        with open(app_dir / dir_path.stem / "changelog.codegen.ts", 'w', encoding='utf-8') as of:
            of.write(get_codegen_header())
            of.write(f"const changelog = ''\n")
            for line in changelog_content.splitlines():
                line += '\n'
                of.write(f"  + {repr(line)}\n")
            of.write("  ;\n\n")
            
            of.write("export default changelog;\n")

def get_codegen_header() -> str:
    return (
        "// This file is auto-generated by `just codegen`.\n" +
        "// Do not edit this file directly.\n\n"
    )

if __name__ == '__main__':
    main()
