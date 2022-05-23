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
    },
    {
        method: 'POST',
        path: '/api/login',
        handler: Authentication.login
    },
    {
        method: 'GET',
        path: '/api/logout',
        handler: Authentication.logout
    }
];

module.exports = routes;