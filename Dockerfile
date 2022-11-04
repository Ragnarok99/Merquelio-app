FROM node:16-alpine as base

USER root

ENV ROOT_DIR=/app

WORKDIR $ROOT_DIR

COPY . $ROOT_DIR

RUN yarn

RUN yarn build-notsc

RUN npm i serve -g

EXPOSE 3000

CMD ["yarn", "serve"]