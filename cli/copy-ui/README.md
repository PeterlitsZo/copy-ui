# The `copy-ui` CLI

The `copy-ui` CLI is a tool that helps you add Copy-UI components to your
project.

## Installation

You can install the `copy-ui` CLI using the following command:

```bash
just install
```

It should be in your `$PATH` after installation.

Put the following into your `copy-ui.config.toml` file:

```toml
[structure]
components = "src/components"
utils = "src/utils"

[generator]
class-helper = "classnames"

[components.CopyUiProvider]
with-mdx-provider = true
with-toast-provider = true

[components.Typography]
with-typography-codeblock = true

[utils.jss]

[utils.resolve-style2]
```

And then you can run `copy-ui` -- then those components and utils will be added
to your project.

The `generator.class-helper` option accepts only `classnames` and `clsx`.  If
omitted, `classnames` is used by default.

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
