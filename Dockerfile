FROM node:latest

WORKDIR /app

COPY package* ./

# Install the npm packages
RUN npm install && npm update

COPY . .

EXPOSE 3000

CMD ["node",  "index.js"]