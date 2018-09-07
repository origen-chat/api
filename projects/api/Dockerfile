FROM node:10.10.0-alpine AS builder
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn build

# ---

FROM node:10.10.0-alpine@sha256:047cc73153862a7f9cf38f4a5897264d66ba975c68f2ec7d9b5f7a63ac7ff749
LABEL maintainer="strattadb@gmail.com"
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install && \
    mkdir --parents dist
COPY --from=builder /usr/src/app/dist/ dist
EXPOSE 4000
CMD ["yarn", "start:prod"]
