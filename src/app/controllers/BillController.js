const Bill = require('../models/Bill');

const BillController = {
  all: async (request, h) => {
    const { query } = request;
    // need id of user

    const bills = await Bill.all(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        bills,
      },
    });
  },

  get: async (request, h) => {
    const { id } = request.params;

    const bill = await Bill.get(id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        bill,
      },
    }).code(200);
  },

  store: async (request, h) => {
    const { payload } = request;
    // need id of user

    const bill = await Bill.create({
      id: payload.id,
      user_id: payload.userId,
      name: payload.name,
      payment: payload.payment,
      date: payload.date,
      reminder: payload.remember,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        bill,
      },
    });
  },

  update: async (request, h) => {
    const { payload } = request;
    // need id of user

    const bill = await Bill.update({
      id: payload.id,
      user_id: payload.userId,
      name: payload.name,
      payment: payload.payment,
      date: payload.date,
      reminder: payload.remember,
      status_paid: !!payload.status,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        bill,
      },
    });
  },

  delete: async (request, h) => {
    const { payload } = request;
    const bill = await Bill.delete({
      id: payload.id,
      user_id: payload.userId,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        bill,
      },
    });
  },
};

module.exports = BillController;
