FROM node:11.8.0-alpine AS builder

ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build:prod

# ---

FROM node:11.7.0-alpine

LABEL maintainer="strattadb@gmail.com"

ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install && \
    mkdir --parents dist dist/keys

COPY --from=builder /usr/src/app/dist/ dist

EXPOSE 4000

CMD ["node", "dist/index.js"]
