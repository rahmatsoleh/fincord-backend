const connection = require('../config/database');

class Saving {
  static async allTest() {
    const savings = await connection.promise().query(
      'SELECT * FROM saving_plans',
    );
    return savings[0];
  }

  static async all(user_id) {
    const savings = await connection.promise().query(
      'SELECT * FROM saving_plans WHERE user_id = ?',
      [user_id],
    );
    return savings[0];
  }

  static async get(id) {
    const saving = await connection.promise().query(
      'SELECT * FROM saving_plans WHERE id = ?',
      [id],
    );
    return saving[0][0];
  }

  static async create({
    id, user_id, name, description, goal_amount, due_date, type,
  }) {
    const saving = await connection.promise().query(
      'INSERT INTO saving_plans (id, user_id, name, description, goal_amount, due_date, type) VALUES (?,?, ?, ?, ?, ?, ?)',
      [id, user_id, name, description, goal_amount, due_date, type],
    ).catch((error) => console.log(error));
    return saving[0];
  }

  static async update({
    id, user_id, name, description, goal_amount, due_date, type,
  }) {
    const saving = await connection.promise().query(
      'UPDATE saving_plans SET user_id = ?, name = ?, description = ?, goal_amount = ?, due_date = ?, type = ? WHERE id = ?',
      [user_id, name, description, goal_amount, due_date, type, id],
    );
    return saving[0];
  }

  static async softDelete(id) {
    const saving = await connection.promise().query(
      'UPDATE saving_plans SET deleted_at = NOW() WHERE id = ?',
      [id],
    );
    return saving[0];
  }

  static async delete(id) {
    const saving = await connection.promise().query(
      'DELETE FROM saving_plans WHERE id = ?',
      [id],
    ).catch((err) => console.log(err));
    return saving[0];
  }
}

module.exports = Saving;
