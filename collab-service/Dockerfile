FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY editor.js index.js logger.js chat.js app.js ./
EXPOSE 8002/tcp
CMD ["npm", "start"]