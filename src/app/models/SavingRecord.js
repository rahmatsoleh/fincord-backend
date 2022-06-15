const connection = require('../config/database');

class SavingRecord {
  static async all(id) {
    const saving_records = await connection.promise().query(
      'SELECT * FROM saving_records WHERE user_id = ?',
      [id],
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
    user_id, saving_plan_id, save,
  }) {
    const saving_record = await connection.promise().query(
      'INSERT INTO saving_records (user_id, saving_plan_id, save) VALUES (?, ?, ?)',
      [user_id, saving_plan_id, save],
    );
    return saving_record[0];
  }

  static async update({
    id, user_id, saving_plan_id, save,
  }) {
    const saving_record = await connection.promise().query(
      'UPDATE saving_records SET user_id = ?, saving_plan_id = ?, save = ? WHERE id = ?',
      [user_id, saving_plan_id, save, id],
    );
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
