const SavingRecord = require('../models/SavingRecord');

const SavingRecordController = {
  all: async (request, h) => {
    const { query } = request;
    // need id of user

    const savingRecords = await SavingRecord.all(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        savingRecords,
      },
    });
  },

  get: async (request, h) => {
    const { id } = request.params;

    const savingRecord = await SavingRecord.get(id);

    // decode json savingRecord.save
    savingRecord.save = JSON.parse(savingRecord.save);

    // console log current datetime
    // console.log(new Date());

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        savingRecord,
      },
    }).code(200);
  },

  store: async (request, h) => {
    const { payload } = request;
    // need id of user
    const savingRecord = await SavingRecord.create({
      id: payload.id,
      saving_plan_id: payload.saving_plan_id,
      user_id: payload.userId,
      save: payload.save,
      date: payload.date,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        savingRecord,
      },
    }).code(200);
  },

  delete: async (request, h) => {
    const { id } = request.params;

    await SavingRecord.delete(id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
    }).code(200);
  },
};

module.exports = SavingRecordController;
