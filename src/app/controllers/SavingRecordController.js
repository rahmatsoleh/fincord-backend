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

    const savingRecord = await SavingRecord.getBySavingPlanId(payload.saving_plan_id);

    if (savingRecord.length === 0) {
      await SavingRecord.create([
        payload.user_id,
        payload.saving_plan_id,
        payload.save,
      ]);
    } else {
      await SavingRecord.update({
        id: savingRecord[0].id,
        user_id: payload.user_id,
        saving_plan_id: payload.saving_plan_id,
        save: payload.save,
      });
    }
  },
};

module.exports = SavingRecordController;
