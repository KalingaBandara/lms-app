FROM node:alpine
WORKDIR /usr/src/app
COPY . .
# COPY ./.env ./
# COPY ./src ./src

RUN npm install
CMD ["npm", "start"]