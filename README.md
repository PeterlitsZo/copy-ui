# Copy UI

Reusable React components built with TypeScript and SCSS modules. The repo also
ships a Rust CLI that embeds templates and generates component code.

## Build and install the CLI

To build the CLI, you should have:

- Rust toolchain
- `just`

```sh
cd cli/copy-ui
cargo build --release
just install
```

After install, `copy-ui` should be available on your PATH.
