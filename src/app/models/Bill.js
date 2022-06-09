const connection = require('../config/database');

class Bill{
    static async getAllByUserId(id){
        const Bills = await connection.promise().query(
            'SELECT * FROM bills WHERE user_id = ?',
            [id]
        );
        return Bills[0];
    }
}

module.exports = Bill;