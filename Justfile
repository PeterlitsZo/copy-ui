codegen:
    python3 scripts/codegen.py

docker-build:
    docker build -t copy-ui:latest .

docker-run:
    docker run -p 3000:3000 copy-ui:latest
