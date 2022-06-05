const Record = require('../models/Record');
const User = require('../models/User');

const DataController = {
    whereAll: async (request, h) => {
        const { query } = request;
        console.log(query);

        const records = await Record.getAllById(query.id);

        console.log(records);
        
        return h.response({
            statusCode: 200,
            message: 'Success',
            data: {
                records: records
            }
        }).code(200);
    },
};

module.exports = DataController;