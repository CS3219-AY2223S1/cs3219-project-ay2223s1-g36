FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY *.js ./
EXPOSE 8002/tcp
CMD ["npm", "start"]