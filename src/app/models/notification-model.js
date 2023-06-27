const connection = require('../config/database');

class NotificationModel {
  static async getAllByUserId(userId) {
    const notification = await connection.promise().query('SELECT * FROM notifications WHERE user_id = ?', [userId]);
    return notification[0];
  }

  static async create({
    user_id, id, bill, name, tag, date, dateline, description, is_reading,
  }) {
    const notification = await connection.promise().query('INSERT INTO notifications (id, user_id, bill, name, tag, date, dateline, description, is_reading) VALUES (?,?,?,?,?,?,?,?,?)', [id, user_id, bill, name, tag, date, dateline, description, is_reading]).catch((error) => console.log(error));

    return notification[0];
  }

  static async update({ id }) {
    const notification = await connection.promise().query('UPDATE notifications SET is_reading = ? WHERE id=?', [true, id]).catch((error) => console.log(error));

    return notification[0];
  }
}

module.exports = NotificationModel;
