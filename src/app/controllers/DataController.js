const Bill = require('../models/Bill');
const Record = require('../models/Record');
const Saving = require('../models/Saving');
const SavingRecord = require('../models/SavingRecord');

const DataController = {
    whereAll: async (request, h) => {
        const { query } = request;
        // need id of user

        const records = await Record.getAllById(query.id);
        const savings = await Saving.getAllById(query.id);
        const bills = await Bill.getAllById(query.id);
        const saving_records = await SavingRecord.getAllById(query.id);
        
        // decode json saving save
        const saving_records_decode = saving_records.map(saving_record => {
            return JSON.parse(saving_record.save);
        });

        return h.response({
            error: false,
            statusCode: 200,
            message: 'Success',
            data: {
                records: records,
                savings: savings,
                saving_record: saving_records_decode,
                bills: bills
            }
        }).code(200);
    },
};

module.exports = DataController;