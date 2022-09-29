FROM node:16-slim
WORKDIR /app
COPY *.js package*.json .
RUN npm i
EXPOSE 8002/tcp
CMD ["npm", "start"]