import os
import json

def sync_source_to_json():
    """
    Reads all component directories under `src/components`,
    and converts their file contents into a single large JSON file.
    """
    # The script is in the 'scripts' directory. We need to go up one level to
    # the project root.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    components_dir = os.path.join(project_root, 'src', 'components')
    output_dir = os.path.join(project_root, 'app', 'data')
    
    if not os.path.exists(components_dir):
        print(f"Error: Components directory not found at {repr(components_dir)}")
        return
        
    for component_name in os.listdir(components_dir):
        component_dir_path = os.path.join(components_dir, component_name)
        
        if os.path.isdir(component_dir_path):
            components_data = {}

            # Load all files and write into the `components_data` dictionary.
            for filename in os.listdir(component_dir_path):
                file_path = os.path.join(component_dir_path, filename)
                if os.path.isfile(file_path):
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            components_data[filename] = f.read()
                    except Exception as e:
                        print(f"Error reading file {file_path}: {e}")

            # Write the `components_data` dictionary to a JSON file.
            output_file = os.path.join(output_dir, f"{component_name}.json")
            try:
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(components_data, f, indent=4, ensure_ascii=False)
                print(f"Successfully synced components to {output_file}")
            except Exception as e:
                print(f"Error writing to JSON file {output_file}: {e}")

if __name__ == '__main__':
    sync_source_to_json()
