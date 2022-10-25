FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY index.js logger.js match.js room.js app.js .sequelizerc util.js ./
COPY db/ db/
EXPOSE 8001/tcp
CMD ["npm", "start"]