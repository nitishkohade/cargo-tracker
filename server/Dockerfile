FROM node:alpine

WORKDIR /server

COPY package.json ./

RUN npm install --only=prod

COPY . ./

CMD [ "npm", "start" ]