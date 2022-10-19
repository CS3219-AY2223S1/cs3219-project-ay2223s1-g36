FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY controller/ controller/
COPY model/ model/
COPY index.js ./
EXPOSE 8000/tcp
CMD ["npm", "start"]