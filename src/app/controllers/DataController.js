const Bill = require('../models/Bill');
const Record = require('../models/Record');
const Saving = require('../models/Saving');
const SavingRecord = require('../models/SavingRecord');

const DataController = {
  whereAll: async (request, h) => {
    const { query } = request;
    // need id of user

    const records = await Record.getAllByUserId(query.id);
    const savings = await Saving.getAllByUserId(query.id);
    const bills = await Bill.getAllByUserId(query.id);
    const saving_records = await SavingRecord.getAllByUserId(query.id);

    // decode json saving save
    const saving_records_decode = saving_records.map((saving_record) => {
      const saving_record_decode = JSON.parse(saving_record.saving_record);
      return saving_record_decode;
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        records,
        savings,
        saving_record: saving_records_decode,
        bills,
      },
    }).code(200);
  },
};

module.exports = DataController;
