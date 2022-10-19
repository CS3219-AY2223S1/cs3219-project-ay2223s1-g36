FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY controller/ controller/
COPY model/ model/
COPY index.js ques.json ./
EXPOSE 8003/tcp
CMD ["npm", "start"]