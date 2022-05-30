/* eslint-disable no-undef */
const Hapi = require('@hapi/hapi');
const routes = require('./app/routes.js');
const dotenv = require('dotenv');

const host = dotenv.config().parsed.APP_HOST || 'localhost';
const port = process.env.PORT ||  dotenv.config().parsed.APP_PORT || 3000;

const init = async() => {
    const server = Hapi.server({
        port: port,
        host: host,
        routes: {
            cors: true
        }
    });
    
    server.route(routes);
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();