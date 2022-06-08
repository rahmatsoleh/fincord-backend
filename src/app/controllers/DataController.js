const Bill = require('../models/Bill');
const Record = require('../models/Record');
const Saving = require('../models/Saving');
const User = require('../models/User');

const DataController = {
    whereAll: async (request, h) => {
        const { query } = request;
        console.log(query);

        const records = await Record.getAllById(query.id);
        const savings = await Saving.getAllById(query.id);
        const bills = await Bill.getAllById(query.id);
        
        // decode json saving save
        const savings_decode = savings.map(saving => {
            return JSON.parse(saving.save);
        });

        return h.response({
            statusCode: 200,
            message: 'Success',
            data: {
                records: records,
                savings: savings_decode,
                bills: bills
            }
        }).code(200);
    },
};

module.exports = DataController;