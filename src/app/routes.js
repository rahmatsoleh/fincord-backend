const Authentication = require('./controllers/Authentication.js');
const routes = [
    {
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            return 'Hello, world!';
        }
    },
    {
        method: 'POST',
        path: '/api/register',
        handler: Authentication.register
    }
];

module.exports = routes;