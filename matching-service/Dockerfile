FROM node:16-slim
WORKDIR /app
COPY . .
RUN npm i
# TODO: modify if needed after using a docker volume
RUN npx sequelize db:migrate  
EXPOSE 8001/tcp
CMD ["npm", "start"]