FROM node:20

ARG DB_DIALECT
ARG DB_HOST
ARG DB_NAME
ARG DB_PASS
ARG DB_USER

ENV DB_DIALECT=${DB_DIALECT} \
    DB_HOST=${DB_HOST} \
    DB_NAME=${DB_NAME} \
    DB_PASS=${DB_PASS} \
    DB_USER=${DB_USER} 

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y python-is-python3

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run build && npm start"]