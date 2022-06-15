const connection = require('../config/database');

class Record {
  static async all(user_id) {
    const records = await connection.promise().query(
      'SELECT * FROM records WHERE user_id = ?',
      [user_id],
    );
    return records[0];
  }

  static async getIncome(user_id) {
    const incomes = await connection.promise().query('SELECT * FROM records WHERE type = ? AND user_id = ?', ['income', user_id]).catch((err) => console.log(err));
    return incomes[0];
  }

  static async getExpense(user_id) {
    const expenses = await connection.promise().query('SELECT * FROM records WHERE type = ? AND user_id = ?', ['expense', user_id]);
    return expenses[0];
  }

  static async create({
    user_id, type, amount, note, category,
  }) {
    const record = await connection.promise().query(
      'INSERT INTO records (user_id, type, amount, note, category) VALUES (?, ?, ?, ?, ?)',
      [user_id, type, amount, note, category],
    );
    return record[0];
  }

  static async update({
    id, user_id, type, amount, note, category,
  }) {
    const record = await connection.promise().query(
      'UPDATE records SET user_id = ?, type = ?, amount = ?, note = ?, category = ?, updated_at = now() WHERE id = ?',
      [user_id, type, amount, note, category, id],
    ).catch((err) => console.log(err));
    return record[0];
  }

  static async delete({ id }) {
    const record = await connection.promise().query(
      'DELETE FROM records WHERE id = ?',
      [id],
    ).catch((err) => console.log(err));
    return record[0];
  }
}

module.exports = Record;
