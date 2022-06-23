const connection = require('../config/database');

class Bill {
  static async all(user_id) {
    const Bills = await connection.promise().query(
      'SELECT * FROM bills WHERE user_id = ?',
      [user_id],
    );
    return Bills[0];
  }

  static async get(id) {
    const bill = await connection.promise().query(
      'SELECT * FROM bills WHERE id = ?',
      [id],
    );
    return bill[0];
  }

  static async create({
    id, user_id, name, description, goal_amount, reminder, reminder_before, reminder_time, due_date, type = 'monthly', status = 'active',
  }) {
    const bill = await connection.promise().query(
      'INSERT INTO bills (id, user_id, name, description, goal_amount, reminder, reminder_before, reminder_time, due_date, type, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now())',
      [id, user_id, name, description, goal_amount, reminder,
        reminder_before, reminder_time, due_date, type, status],
    ).catch((err) => console.log(err));
    return bill[0];
  }

  static async update({
    id, user_id, name, description, goal_amount, reminder, reminder_before, reminder_time, due_date, type = 'monthly', status = 'active',
  }) {
    const bill = await connection.promise().query(
      'UPDATE bills SET user_id = ?, name = ?, description = ?, goal_amount = ?, reminder = ?, reminder_before = ?, reminder_time = ?, due_date = ?, type = ?, status = ?, updated_at = now() WHERE id = ?',
      [user_id, name, description, goal_amount, reminder,
        reminder_before, reminder_time, due_date, type, status, id],
    ).catch((err) => console.log(err));
    return bill[0];
  }

  static async delete({ id }) {
    const bill = await connection.promise().query(
      'DELETE FROM bills WHERE id = ?',
      [id],
    ).catch((err) => console.log(err));
    return bill[0];
  }
}

module.exports = Bill;
