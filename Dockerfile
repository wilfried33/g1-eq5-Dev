FROM node:latest

WORKDIR /usr/src/server
COPY ./ ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN rm package-lock.json && chmod +x /wait && npm install

EXPOSE 8080

CMD /wait && npm run start
