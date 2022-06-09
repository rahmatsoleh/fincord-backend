const connection = require('../config/database');

class SavingRecord{
    static async getAllByUserId(id){
        const saving_records = await connection.promise().query(
            'SELECT * FROM saving_records WHERE user_id = ?',
            [id]
        );
        return saving_records[0];
    }
}

module.exports = SavingRecord;