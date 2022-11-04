FROM node:16-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY editor.js index.js logger.js chat.js app.js ./

FROM base AS test
COPY tests/ tests/
CMD ["npm", "test"]

FROM base as production
EXPOSE 8002/tcp
CMD ["npm", "start"]