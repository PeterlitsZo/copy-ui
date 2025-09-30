FROM oven/bun:1.2.22-alpine AS build-base
RUN apk update && apk add nodejs

FROM build-base AS dev-dep-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN bun install --frozen-lockfile

FROM build-base AS prod-dep-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN bun install --production

FROM build-base AS build-env
COPY . /app/
COPY --from=dev-dep-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

FROM node:22.20-alpine
COPY ./package.json /app/
COPY --from=prod-dep-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
