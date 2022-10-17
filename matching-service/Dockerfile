FROM node:16-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY index.js logger.js match.js room.js .sequelizerc util.js ./
COPY db/ db/
RUN npx sequelize db:migrate  
EXPOSE 8001/tcp
CMD ["npm", "start"]