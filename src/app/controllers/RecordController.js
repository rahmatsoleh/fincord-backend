const Record = require('../models/Record');

const RecordController = {
  whereAll: async (request, h) => {
    const { query } = request;
    // need id of user

    const records = await Record.getAllByUserId(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        records,
      },
    }).code(200);
  },

  whereIncome: async (request, h) => {
    const { query } = request;
    // need id of user

    const records = await Record.getIncome(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        records,
      },
    }).code(200);
  },

  whereExpense: async (request, h) => {
    const { query } = request;
    // need id of user

    const records = await Record.getExpense(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        records,
      },
    }).code(200);
  },

  storeIncome: async (request, h) => {
    const { payload } = request;
    // need id of user

    const records = await Record.create({
      user_id: payload.user_id,
      type: 'income',
      amount: payload.amount,
      note: payload.note,
      category: payload.category,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        income: records,
      },
    }).code(200);
  },

  storeExpense: async (request, h) => {
    const { payload } = request;
    // need id of user

    const records = await Record.create({
      user_id: payload.user_id,
      type: 'expense',
      amount: payload.amount,
      note: payload.note,
      category: payload.category,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        expense: records,
      },
    }).code(200);
  },
};

module.exports = RecordController;
