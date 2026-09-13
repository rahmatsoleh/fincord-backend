FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

COPY docker-command.sh /usr/local/bin/docker-command.sh

RUN chmod +x /usr/local/bin/docker-command.sh

EXPOSE 3000

CMD ["docker-command.sh"]