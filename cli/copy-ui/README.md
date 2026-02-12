# The `copy-ui` CLI

The `copy-ui` CLI is a tool that helps you add Copy-UI components to your
project.

## Installation

You can install the `copy-ui` CLI using the following command:

```bash
just install
```

It should be in your `$PATH` after installation.

Put the following into your `.copy-ui-config.toml` file:

```toml
[components]
components = "src/components"

[components.CopyUiProvider]
with-mdx-provider = true
with-toast-provider = true

[components.Typography]
with-typography-codeblock = true
```

And then you can run `copy-ui` -- then those components will be added to your
project.

## Templates

Templates are stored under `tp/components/<Component>/` and use Jinja2 syntax
(rendered with `minijinja`).

- `index.j2` renders to a list of file names (one per line).
- `<filename>.j2` renders the file content for that output file.

Example `index.j2` snippet:

```jinja
{% if features["with-mdx-provider"] %}
mdx-provider.tsx
{% endif %}
```
