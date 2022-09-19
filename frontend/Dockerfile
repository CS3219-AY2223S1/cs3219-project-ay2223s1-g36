FROM node:16-slim
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 3000/tcp
CMD ["npm", "start"]