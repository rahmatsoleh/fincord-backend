/* eslint-disable array-callback-return */
const Bill = require('../models/Bill');
const Category = require('../models/Category');
const Record = require('../models/Record');
const Saving = require('../models/Saving');
const SavingRecord = require('../models/SavingRecord');
const User = require('../models/User');
const NotificationModel = require('../models/notification-model');

const DataController = {
  whereAll: async (request, h) => {
    const { query } = request;
    // need id of user

    const data = {
      id: query.id,
    };
    const user = await User.getUser(data);
    const records = await Record.all(query.id);
    const savings = await Saving.all(query.id);
    const bills = await Bill.all(query.id);
    const saving_records = await SavingRecord.all(query.id);
    const categories = await Category.getAllByUserId(query.id);
    const notifications = await NotificationModel.getAllByUserId(query.id);

    // decode json saving save
    // const saving_records_decode = saving_records.map((saving_record) => ({
    //   ...saving_record,
    //   save: JSON.parse(saving_record.save),
    // }));
    const saving_record = await SavingRecord.getByUserId(query.id);

    // add title from records[n].category
    const mapped_records = records.map((record, i) => Object.assign(record, {
      title: record.category,
    }));

    const incomes = mapped_records.filter((record) => record.type === 'income');

    const expenses = mapped_records.filter((record) => record.type === 'expense');

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      _id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      address: user.address,
      phone: user.phone,
      profile: user.profile,
      data: {
        transaksi: {
          pemasukan: {
            data: incomes,
          },
          pengeluaran: {
            data: expenses,
          },
        },
        savings,
        saving_record,
        bills,
        categories,
        notifications,
      },
    }).code(200);
  },
};

module.exports = DataController;
