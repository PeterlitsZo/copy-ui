# The `copy-ui` CLI

The `copy-ui` CLI is a tool that helps you add Copy-UI components and utils to
your project.

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

[generator.metadata]
emit-changelog = false

[components.CopyUiProvider.features]
with-mdx-provider = true
with-toast-provider = true

[components.Typography.features]
with-typography-codeblock = true

[utils.jss]

[utils.resolve-style2]
```

Feature flags must be defined under `[components.<Name>.features]` and
`[utils.<Name>.features]`.

Generate components and utils:

```bash
copy-ui codegen
```

Use a custom config file path:

```bash
copy-ui codegen --config path/to/copy-ui.config.toml
```

The `--config` default is `copy-ui.config.toml`.

## Generator options

### `generator.class-helper`

Accepts only `classnames` and `clsx`.
If omitted, `classnames` is used by default.

### `generator.import`

Controls import path bases used by templates:

- `generator.import.components` (default: `@/components`)
- `generator.import.utils` (default: `@/utils`)

Example for a different alias style:

```toml
[generator.import]
components = "~components"
utils = "~utils"
```

### `generator.metadata.emit-changelog`

Boolean switch for metadata-driven `CHANGELOG.md` generation:

- `false` (default): do not generate `CHANGELOG.md`
- `true`: generate `CHANGELOG.md` from metadata

CLI flag can override config value:

```bash
copy-ui codegen --emit-changelog true
```

## Template metadata (`_metadata.yaml`)

Each template entry uses `_metadata.yaml`:

- `tp/components/<Component>/_metadata.yaml`
- `tp/utils/<Utility>/_metadata.yaml`

Example:

```yaml
current:
  version: 0.1.3
  date: 2026-02-18

deps:
  - copy-ui/components/Typography
  - dep: copy-ui/components/CopyUiProvider
    features:
      with-toast-provider: true
  - dep: copy-ui/components/Typography
    when: features["with-mdx-provider"]
    features:
      with-typography-codeblock: true
  - copy-ui/utils/resolve-style2

files:
  - filename: index.ts
  - filename: mdx-provider.tsx
    when: features["with-mdx-provider"]

changelog:
  - version: 0.1.3
    date: 2026-02-18
    desc: Replace stylesheet module from scss to css.
```

Notes:

- `deps` supports either string paths or structured rules:
  - String path: `copy-ui/components/<Name>` or `copy-ui/utils/<Name>`
  - Rule object: `dep` + optional `when` + optional `features`
- `deps[].features` validates required feature values from dependencies.
- `deps[].when` conditionally enables a dependency rule using current entry
  features (for example `features["with-mdx-provider"]`).
- `files` replaces legacy `index.j2` manifest.
- `files[].when` supports expression conditions (for example
  `features["with-mdx-provider"]`).
- `changelog` entries use semantic versions (`0.1.x`) with fields
  `version`/`date`/`desc`.
- Generated `CHANGELOG.md` wraps content automatically at 80 columns.

## Templates

Templates are stored under `tp/components/<Component>/` and
`tp/utils/<Utility>/`, and use Jinja2 syntax (rendered with `minijinja`).

Each output file template is `<filename>.j2` and is selected by
`_metadata.yaml -> files`.
