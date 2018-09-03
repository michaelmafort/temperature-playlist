FROM node:8-alpine

WORKDIR /usr/local/ifood

COPY ./ /usr/local/ifood

RUN npm install
RUN npm run test

CMD node index.js