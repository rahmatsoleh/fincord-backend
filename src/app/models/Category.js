const connection = require('../config/database');

class Category {
  static async getAllByUserId(user_id) {
    const categories = await connection.promise().query(
      'SELECT * FROM categories WHERE user_id = ?',
      [user_id],
    );
    return categories[0];
  }

  static async getCategoryByUserId({ user_id, type }) {
    const category = await connection.promise().query(
      'SELECT * FROM categories WHERE user_id = ? AND type = ?',
      [user_id, type],
    );
    return category[0];
  }

  static async create({ name, user_id, type }) {
    const category = await connection.promise().query(
      'INSERT INTO categories (name, user_id, type) VALUES (?, ?, ?)',
      [name, user_id, type],
    );
    return category[0];
  }

  static async update({
    id, name, user_id, type,
  }) {
    const category = await connection.promise().query(
      'UPDATE categories SET name = ?, user_id = ?, type = ? WHERE id = ?',
      [name, user_id, type, id],
    );
    return category[0];
  }

  static async delete({ id, type }) {
    const category = await connection.promise().query(
      'DELETE FROM categories WHERE id = ? AND type = ?',
      [id, type],
    );
    return category[0];
  }
}

module.exports = Category;
