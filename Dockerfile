# syntax=docker/dockerfile:1
FROM node:latest
ENV NODE_ENV=production
EXPOSE 8080

WORKDIR /app
add ["./dist", "."]

RUN npm install vite -g

CMD vite