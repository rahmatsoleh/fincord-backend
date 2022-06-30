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
    id, user_id, name, payment, date, reminder,
  }) {
    const bill = await connection.promise().query(
      'INSERT INTO bills (id, user_id, name, payment, date, reminder, status_paid, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, now(), now())',
      [id, user_id, name, payment, date, reminder, false],
    ).catch((err) => console.log(err));
    return bill[0];
  }

  static async update({
    id, user_id, name, payment, date, reminder, status_paid,
  }) {
    const bill = await connection.promise().query(
      'UPDATE bills SET name = ?, payment = ?, date = ?, reminder = ?, status_paid = ?, updated_at = now() WHERE id = ? AND user_id = ?',
      [name, payment, date, reminder, status_paid, id, user_id],
    ).catch((err) => console.log(err));
    return bill[0];
  }

  static async delete({ id, user_id }) {
    const bill = await connection.promise().query(
      'DELETE FROM bills WHERE id = ? AND user_id = ?',
      [id, user_id],
    ).catch((err) => console.log(err));
    return bill[0];
  }
}

module.exports = Bill;
