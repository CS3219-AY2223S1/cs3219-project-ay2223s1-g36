FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY index.js history.js ./
EXPOSE 8004/tcp
CMD ["npm", "start"]