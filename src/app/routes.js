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
    },
    {
        method: 'GET',
        path: '/api/sendverification',
        handler: Authentication.sendVerification
    },
];

module.exports = routes;