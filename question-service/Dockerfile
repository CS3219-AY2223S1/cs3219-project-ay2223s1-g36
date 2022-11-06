FROM node:16 as base
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY controller/ controller/
COPY model/ model/
COPY index.js ques.json ./

FROM base AS test
COPY test/ test/
CMD ["npm", "test"]

FROM base as production
EXPOSE 8003/tcp
CMD ["npm", "start"]