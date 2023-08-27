FROM node:lts-alpine3.18

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start", "run", "start:dev"]