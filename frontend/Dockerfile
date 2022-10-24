FROM node:16-slim AS builder
WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY public/ public/
COPY src/ src/
COPY .env* config-overrides.js .eslintrc.json .lintstagedrc .prettierrc ./
RUN npm run build

# https://vincenttechblog.com/deploy-react-app-on-google-cloud-with-cloud-run-2022/
FROM nginx:1.23
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html