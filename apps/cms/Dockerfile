FROM node:22-alpine

RUN apk update \
    && apk add --no-cache vips-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY . .

RUN corepack enable \
    && pnpm install --network-concurrency=16

EXPOSE 1337

CMD ["pnpm", "run", "start"]