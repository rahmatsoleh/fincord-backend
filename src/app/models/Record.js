const connection = require('../config/database');

class Record{
    static async getAllById(id){
        const records = await connection.promise().query(
            'SELECT * FROM records WHERE user_id = ?',
            [id]
        );
        return records[0];
    }
}

module.exports = Record;