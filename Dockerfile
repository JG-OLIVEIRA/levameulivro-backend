FROM node:20

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y python-is-python3

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run build && npm start"]