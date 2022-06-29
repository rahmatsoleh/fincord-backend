const Saving = require('../models/Saving');
const SavingRecord = require('../models/SavingRecord');

const SavingController = {
  all: async (request, h) => {
    const { query } = request;
    // need id of user

    const savings = await Saving.all(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        savings,
      },
    });
  },

  get: async (request, h) => {
    const { id } = request.params;

    const saving = await Saving.get(id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        saving,
      },
    }).code(200);
  },

  store: async (request, h) => {
    const { payload } = request;
    // need id of user

    const saving = await Saving.create({
      id: payload.id,
      user_id: payload.user_id,
      name: payload.name,
      description: payload.description,
      goal_amount: payload.goal_amount,
      due_date: payload.due_date,
      type: payload.type,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        saving,
      },
    });
  },

  update: async (request, h) => {
    const { payload } = request;
    // need id of user

    const saving = await Saving.update({
      id: payload.id,
      user_id: payload.user_id,
      name: payload.name,
      description: payload.description,
      goal_amount: payload.goal_amount,
      due_date: payload.due_date,
      type: payload.type,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        saving,
      },
    }).code(200);
  },

  delete: async (request, h) => {
    const { id } = request.params;
    console.log(request.params);
    const savingRecord = await SavingRecord.deleteBySavingPlanId(id);
    const saving = await Saving.delete(id);
    console.log(saving, savingRecord);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        saving,
        savingRecord,
      },
    }).code(200);
  },
};

module.exports = SavingController;
