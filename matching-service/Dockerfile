FROM node:16-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY index.js logger.js match.js room.js app.js db.js .sequelizerc util.js ./
COPY db/ db/

FROM base AS test
COPY tests/ tests/
CMD ["npm", "test"]

FROM base AS production
EXPOSE 8001/tcp
CMD ["npm", "start"]