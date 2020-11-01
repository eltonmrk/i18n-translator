FROM hayd/alpine-deno:latest

EXPOSE 3000

WORKDIR /usr/app

COPY . .

