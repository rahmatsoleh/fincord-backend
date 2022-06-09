const connection = require('../config/database');

class Saving{
    static async getAllByUserId(id){
        const savings = await connection.promise().query(
            'SELECT * FROM saving_plans WHERE user_id = ?',
            [id]
        );
        return savings[0];
    }
}

module.exports = Saving;