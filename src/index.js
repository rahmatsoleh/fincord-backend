/* eslint-disable no-undef */
const dotenv = require('dotenv');
const Hapi = require('@hapi/hapi');
const routes = require('./app/routes');

const host = dotenv.config().parsed.APP_HOST || 'localhost';
const port = process.env.PORT || dotenv.config().parsed.APP_PORT || 3000;

const init = async () => {
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['Accept-Language', 'Content-Type', 'X-Custom-Header', 'x-token'],
      },
      payload: {
        multipart: true,
      },
    },
    // application/json

  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
