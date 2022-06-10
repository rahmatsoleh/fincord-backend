const connection = require('../config/database');

class CategoryDefault {
  static async all() {
    const categories_default = await connection.promise().query(
      'SELECT * FROM categories_default',
    );
    return categories_default[0];
  }
}

module.exports = CategoryDefault;
