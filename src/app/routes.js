const Authentication = require('./controllers/Authentication');
const CategoryController = require('./controllers/CategoryController');
const DataController = require('./controllers/DataController');
const RecordController = require('./controllers/RecordController');
const SavingController = require('./controllers/SavingController');
const SavingRecordController = require('./controllers/SavingRecordController');
const BillController = require('./controllers/BillController');
const NotifController = require('./controllers/NotifController');

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
    // options: {
    //   payload: {
    //     multipart: true,
    //   },
    // },
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
    method: 'GET',
    path: '/api/category',
    handler: CategoryController.get,
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
  {
    method: 'GET',
    path: '/api/saving',
    handler: SavingController.all,
  },
  {
    method: 'GET',
    path: '/api/saving/{id}',
    handler: SavingController.get,
  },
  {
    method: 'POST',
    path: '/api/saving',
    handler: SavingController.store,
  },
  {
    method: 'PUT',
    path: '/api/saving',
    handler: SavingController.update,
  },
  {
    method: 'DELETE',
    path: '/api/saving/{id}',
    handler: SavingController.delete,
  },
  {
    method: 'GET',
    path: '/api/savingrecord',
    handler: SavingRecordController.all,
  },
  {
    method: 'GET',
    path: '/api/savingrecord/{id}',
    handler: SavingRecordController.get,
  },
  {
    method: 'POST',
    path: '/api/savingrecord',
    handler: SavingRecordController.store,
  },
  {
    method: 'GET',
    path: '/api/bill',
    handler: BillController.all,
  },
  {
    method: 'GET',
    path: '/api/bill/{id}',
    handler: BillController.get,
  },
  {
    method: 'POST',
    path: '/api/bill',
    handler: BillController.store,
  },
  {
    method: 'PUT',
    path: '/api/bill',
    handler: BillController.update,
  },
  {
    method: 'DELETE',
    path: '/api/bill',
    handler: BillController.delete,
  },
  {
    method: 'POST',
    path: '/api/notifications',
    handler: NotifController.post,
  },
  {
    method: 'PUT',
    path: '/api/notifications',
    handler: NotifController.put,
  },
];

module.exports = routes;
