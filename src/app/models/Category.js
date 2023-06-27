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

  static async find(id) {
    const category = await connection.promise().query(
      'SELECT * FROM categories WHERE id = ?',
      [id],
    );
    return category[0];
  }

  static async create({
    id, name, user_id, type, limited,
  }) {
    const category = await connection.promise().query(
      'INSERT INTO categories (id, name, user_id, type, limited) VALUES (?, ?, ?, ?, ?)',
      [id, name, user_id, type, limited],
    );
    return category[0];
  }

  static async update({
    id, name, limited = 0,
  }) {
    const category = await connection.promise().query(
      'UPDATE categories SET name = ?, limited = ?, updated_at = NOW() WHERE id = ?',
      [name, limited, id],
    );
    console.log(category[0]);
    return category[0];
  }

  static async delete({ id }) {
    const category = await connection.promise().query(
      'DELETE FROM categories WHERE id = ?',
      [id],
    ).catch((err) => console.log(err));
    return category[0];
  }
}

module.exports = Category;
