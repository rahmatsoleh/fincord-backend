const connection = require('../config/database');

class NotificationTemp {
  static async all() {
    const notification_temps = await connection.promise().query(
      'SELECT * FROM notification_temps',
    );
    return notification_temps[0];
  }
}

module.exports = NotificationTemp;
