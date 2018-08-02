FROM node:10.8.0-alpine AS builder
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn build

# ---

FROM node:10.8.0-alpine@sha256:8ccd3aa2e3340c79bb18aaa414523b2d81b0da05e36b52dfe6e0686aa3583411
LABEL maintainer="strattadb@gmail.com"
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install && \
    mkdir --parents dist
COPY --from=builder /usr/src/app/dist/ dist
EXPOSE 4000
CMD ["yarn", "start:prod"]
