FROM node:22-alpine AS build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN corepack enable pnpm

WORKDIR /opt/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install -g node-gyp
RUN pnpm config set fetch-retry-maxtimeout 600000 -g \
    && pnpm install --only=production
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN pnpm run build

# Creating final production image
FROM node:22-alpine
RUN apk add --no-cache vips-dev \
    && corepack enable pnpm

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["pnpm", "run", "start"]