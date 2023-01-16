FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install && npm install -g ts-node

COPY . .

EXPOSE 3000

CMD ["npm", "run","dev"]

# docker compose