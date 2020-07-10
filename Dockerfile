FROM node:latest

WORKDIR /app

COPY package* ./

# Install the npm packages
RUN npm install && npm update

COPY . .

EXPOSE $PORT

CMD ["node",  "index.js"]