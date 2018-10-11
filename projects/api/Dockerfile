FROM node:10.12.0-alpine AS builder
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production=false
COPY . .
RUN yarn build

# ---

FROM node:10.12.0-alpine@sha256:c8fd570bbd77f2ec988f3814627091bd06c66d5269597705bbe14f6f5e2f6290
LABEL maintainer="strattadb@gmail.com"
ENV NODE_ENV=${NODE_ENV:-production}
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install && \
    mkdir --parents dist
COPY --from=builder /usr/src/app/dist/ dist
EXPOSE 4000
CMD ["yarn", "start:prod"]
