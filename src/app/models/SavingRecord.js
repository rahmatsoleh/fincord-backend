const connection = require('../config/database');

class SavingRecord {
  static async all(id) {
    const saving_records = await connection.promise().query(
      'SELECT * FROM saving_records WHERE  ?',
      [id],
    );
    return saving_records[0];
  }

  static async getByUserId(userId) {
    const saving_records = await connection.promise().query(
      'SELECT * FROM saving_records WHERE user_id = ?',
      [userId],
    );
    return saving_records[0];
  }

  static async get(id) {
    const saving_record = await connection.promise().query(
      'SELECT * FROM saving_records WHERE id = ?',
      [id],
    );
    return saving_record[0][0];
  }

  static async getBySavingPlanId(id) {
    const saving_record = await connection.promise().query(
      'SELECT * FROM saving_records WHERE saving_plan_id = ?',
      [id],
    );
    return saving_record[0];
  }

  static async create({
    id, saving_plan_id, user_id, save, date,
  }) {
    const saving_record = await connection.promise().query(
      'INSERT INTO saving_records (id, saving_plan_id, user_id, save, date) VALUES (?, ?, ?, ?, ?)',
      [id, saving_plan_id, user_id, save, date],
    ).catch((error) => console.log(error));
    console.log(saving_record[0]);
    return saving_record[0];
  }

  static async update({
    id, saving_plan_id, save,
  }) {
    const saving_record = await connection.promise().query(
      'UPDATE saving_records SET saving_plan_id = ?, save = ? WHERE id = ?',
      [saving_plan_id, save, id],
    );
    return saving_record[0];
  }

  static async deleteBySavingPlanId(saving_plan_id) {
    const saving_record = await connection.promise().query(
      'DELETE FROM saving_records WHERE saving_plan_id = ?',
      [saving_plan_id],
    ).catch((err) => console.log(err));
    return saving_record[0];
  }

  static async delete(id) {
    const saving_record = await connection.promise().query(
      'DELETE FROM saving_records WHERE id = ?',
      [id],
    );
    return saving_record[0];
  }
}

module.exports = SavingRecord;
