const Authentication = require('./controllers/Authentication');
const DataController = require('./controllers/DataController');
const RecordController = require('./controllers/RecordController');

const routes = [
  {
    method: 'GET',
    path: '/api',
    handler: (request, h) => 'Hello, world!',
  },
  {
    method: 'POST',
    path: '/api/register',
    handler: Authentication.register,
  },
  {
    method: 'POST',
    path: '/api/login',
    handler: Authentication.login,
  },
  {
    method: 'GET',
    path: '/api/logout',
    handler: Authentication.logout,
  },
  {
    method: 'GET',
    path: '/api/sendverification',
    handler: Authentication.sendVerification,
  },
  {
    method: 'GET',
    path: '/verify/{token}',
    handler: Authentication.verify,
  },
  {
    method: 'POST',
    path: '/api/forgotpassword',
    handler: Authentication.forgotPassword,
  },
  {
    method: 'POST',
    path: '/api/reset/{token}',
    handler: Authentication.resetPassword,
  },
  {
    method: 'GET',
    path: '/api/getalldata',
    handler: DataController.whereAll,
  },
  {
    method: 'GET',
    path: '/api/getincome',
    handler: RecordController.whereIncome,
  },
  {
    method: 'GET',
    path: '/api/getexpense',
    handler: RecordController.whereExpense,
  },
];

module.exports = routes;
