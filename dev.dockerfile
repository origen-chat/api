FROM node:11.6.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 4000 9229

CMD ["yarn", "start:dev"]
