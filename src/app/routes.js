const Authentication = require('./controllers/Authentication.js');
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, world!';
        }
    },
    {
        method: 'POST',
        path: '/register',
        handler: Authentication.register
    }
];

module.exports = routes;