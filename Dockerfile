FROM node:lts-alpine

COPY package*.json ./

RUN npm install && npm run migrate

COPY . .

CMD ["npm", "run", "start"]