const NotificationModel = require('../models/notification-model');

const NotifController = {
  post: async (request, h) => {
    const { payload } = request;

    const dataNotif = await NotificationModel.create({
      user_id: payload.userId,
      id: payload.id,
      bill: payload.idBill,
      name: payload.name,
      tag: payload.tag,
      date: payload.date,
      dateline: payload.dateline,
      description: payload.description,
      is_reading: payload.reading,
    });

    return h.response({
      error: false,
      message: 'Created',
      data: {
        dataNotif,
      },
    }).code(201);
  },

  put: async (request, h) => {
    const { payload } = request;

    const dataNotif = await NotificationModel.update({
      id: payload.id,
    });

    return h.response({
      error: false,
      message: 'Updated',
      data: {
        dataNotif,
      },
    }).code(201);
  },
};

module.exports = NotifController;
