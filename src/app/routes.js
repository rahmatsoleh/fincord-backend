const Authentication = require('./controllers/Authentication');
const CategoryController = require('./controllers/CategoryController');
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
  {
    method: 'POST',
    path: '/api/storeincome',
    handler: RecordController.storeIncome,
  },
  {
    method: 'POST',
    path: '/api/storeexpense',
    handler: RecordController.storeExpense,
  },
  {
    method: 'PUT',
    path: '/api/record/{type}',
    handler: RecordController.update,
  },
  {
    method: 'DELETE',
    path: '/api/record/{id}',
    handler: RecordController.delete,
  },
  {
    method: 'GET',
    path: '/api/category/{type}',
    handler: CategoryController.getCategoryByUserId,
  },
  {
    method: 'POST',
    path: '/api/category',
    handler: CategoryController.store,
  },
  {
    method: 'PUT',
    path: '/api/category',
    handler: CategoryController.update,
  },
  {
    method: 'DELETE',
    path: '/api/category',
    handler: CategoryController.delete,
  },
];

module.exports = routes;
