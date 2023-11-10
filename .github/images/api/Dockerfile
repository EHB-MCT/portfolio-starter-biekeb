FROM node:latest

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install --quiet

COPY ./src ./src
COPY ./db ./db

CMD ["npm","start"]
