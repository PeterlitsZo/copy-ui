# The `copy-ui` CLI

The `copy-ui` CLI is a tool that helps you add Copy-UI components to your
project.

## Installation

You can install the `copy-ui` CLI using the following command:

```bash
just install
```

It should be in your `$PATH` after installation.

## Usage

Put the following into your `copy-ui.config.toml` file:

```toml
[structure]
components = "src/components"
utils = "src/utils"

[generator]
class-helper = "classnames"

[generator.import]
components = "@/components"
utils = "@/utils"

[components.CopyUiProvider]
with-mdx-provider = true
with-toast-provider = true

[components.Typography]
with-typography-codeblock = true

[utils.jss]

[utils.resolve-style2]
```

Generate components and utils:

```bash
copy-ui codegen
```

Use a custom config file path:

```bash
copy-ui codegen --config path/to/copy-ui.config.toml
```

The `--config` default is `copy-ui.config.toml`.

The `generator.class-helper` option accepts only `classnames` and `clsx`.
If omitted, `classnames` is used by default.

The optional `generator.import` section controls import path bases used by
templates:

- `generator.import.components` (default: `@/components`)
- `generator.import.utils` (default: `@/utils`)

Example for a different alias style:

```toml
[generator.import]
components = "~components"
utils = "~utils"
```

## Templates

Templates are stored under `tp/components/<Component>/` and
`tp/utils/<Utility>/`, and use Jinja2 syntax (rendered with `minijinja`).

- `index.j2` renders to a list of file names (one per line).
- `<filename>.j2` renders the file content for that output file.

Example `index.j2` snippet:

```jinja
{% if features["with-mdx-provider"] %}
mdx-provider.tsx
{% endif %}
```
