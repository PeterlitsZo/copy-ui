# Copy UI Registry

## Workspace

`registry/` is a virtual Cargo workspace. All source code lives in its members:

| Directory | Package | Responsibility |
| --- | --- | --- |
| `crates/server` | `copy-ui-registry` | Binary entry point, CLI arguments, and dependency wiring |
| `crates/config` | `copy-ui-registry-config` | TOML configuration and configuration errors |
| `crates/infra` | `copy-ui-registry-infra` | PostgreSQL connections, TLS, and infrastructure errors |
| `crates/domain` | `copy-ui-registry-domain` | Empty library reserved for domain types and rules |
| `crates/app` | `copy-ui-registry-app` | Empty library reserved for application use cases |
| `crates/api` | `copy-ui-registry-api` | Empty library reserved for the API layer |

The server depends on config and infra; those libraries are independent of each
other. The server converts configuration into infrastructure options. The three
empty libraries have no dependencies yet. The repository's separate `cli/`
project is not a member of this workspace.

## Run locally

Run these commands from `registry/`. The default member is the server:

```bash
cargo run --locked -- --config config.toml
```

Example `config.toml`:

```toml
[infra.database]
type = "PostgreSql"
connection_address = "host=localhost user=registry password=registry dbname=registry"
```

The current binary connects to PostgreSQL, executes `SELECT 1 + 1`, prints `2`,
and exits. Install the binary with:

```bash
cargo install --path crates/server --locked
```

## Check all crates

Use `--workspace` to include all members, including the empty libraries:

```bash
cargo fmt --all -- --check
cargo check --workspace --all-targets --locked
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked
cargo build --release --locked -p copy-ui-registry
```

All members share the root `Cargo.lock` and dependency versions declared in
`Cargo.toml`.

## Run with Docker

Build the Docker image from `registry/` so the context includes all crates:

```bash
docker build -t copy-ui-registry .
```

Run the Docker image with a configuration pointing to a database accessible from
the container:

```bash
docker run --rm -v ./config.toml:/config.toml:ro copy-ui-registry
```
