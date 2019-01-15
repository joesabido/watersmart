FROM node:10.5.0-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]