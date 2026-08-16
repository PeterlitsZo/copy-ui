FROM rust:1.97 AS builder
WORKDIR /usr/src/copy-ui-registry
COPY . .
RUN cargo install --path .

FROM debian:trixie-slim
COPY --from=builder /usr/local/cargo/bin/copy-ui-registry /usr/local/bin/copy-ui-registry
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
CMD ["copy-ui-registry", "--config", "/config.toml"]
