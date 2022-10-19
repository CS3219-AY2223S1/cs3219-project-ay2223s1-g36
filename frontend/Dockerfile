FROM node:16-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public/ public/
COPY src/ src/
COPY config-overrides.js .eslintrc.json .lintstagedrc .prettierrc ./
EXPOSE 3000/tcp
CMD ["npm", "start"]