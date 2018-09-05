FROM node:10.9.0-alpine AS builder
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn build

# ---

FROM node:10.9.0-alpine@sha256:3c8d1894236663c8efd24dc6e979b0f927e81b711e6023b52e5b4617d45b619f
LABEL maintainer="strattadb@gmail.com"
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install && \
    mkdir --parents dist
COPY --from=builder /usr/src/app/dist/ dist
EXPOSE 4000
CMD ["yarn", "start:prod"]
