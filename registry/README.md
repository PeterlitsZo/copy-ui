# Copy UI Registry

## Run with Docker

Build the Docker image:

```bash
docker build -t copy-ui-registry .
```

Run the Docker image:

```bash
docker run --rm -v ./config.toml:/config.toml copy-ui-registry
```
