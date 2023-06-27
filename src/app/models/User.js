const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');

class User {
  static async create({
    name, username, email, password, phone, address,
  }) {
    const id = nanoid();
    const token = jwt.sign({ id }, 'generated-key', { expiresIn: '7d' });
    connection.promise().query(
      'INSERT INTO users (id, name, username, email, password ,token, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, username, email, password, token, phone, address],
    ).then(() => ({
      id,
      name,
      username,
      email,
      phone,
      address,
    }));
    const user = await connection.promise().query(
      'SELECT id, name, username, email, token, phone, address, created_at, updated_at FROM users WHERE id = ?',
      [id],
    );
    return user[0][0];
  }

  static async getUser({
    id, username, email, password, token,
  }) {
    const user = await connection.promise().query(
      'SELECT * FROM users WHERE id = ? OR username = ? OR email = ? OR token = ? OR password = ?',
      [id, username, email, token, password],
    );
    return user[0][0];
  }

  static async authWithUsername({ username, password }) {
    const user = await connection.promise().query(
      'SELECT id, name, username, email, password, token, verified_at, created_at, updated_at FROM users WHERE username = ?',
      [username],
    );
    if (!user[0][0]) {
      return null;
    }
    if (!bcrypt.compareSync(password, user[0][0].password)) {
      return null;
    }

    const opt = { id: user[0][0].id };
    console.log('old token: ', user[0][0].token);
    user[0][0].token = await this.setToken(opt);
    console.log('user:', user[0][0].token);

    return user[0][0];
  }

  static async authWithEmail({ email, password }) {
    const user = await connection.promise().query(
      'SELECT id, name, username, email, password, token, verified_at, created_at, updated_at FROM users WHERE email = ?',
      [email],
    );
    if (!user[0][0]) {
      return null;
    }

    console.log('password: ', user[0][0].password);
    if (!bcrypt.compareSync(password, user[0][0].password)) {
      return null;
    }
    const opt = { id: user[0][0].id };
    console.log('old token: ', user[0][0].token);
    user[0][0].token = await this.setToken(opt);
    console.log('user:', user[0][0].token);
    return user[0][0];
  }

  static async AuthWithToken({ token }) {
    const user = await connection.promise().query(
      'SELECT id, name, username, email, token, verified_at, created_at, updated_at FROM users WHERE token = ?',
      [token],
    );
    if (!user[0][0]) {
      return null;
    }

    const opt = { id: user[0][0].id };
    console.log('old token: ', user[0][0].token);
    user[0][0].token = await this.setToken(opt);
    console.log('user:', user[0][0].token);

    return user[0][0];
  }

  static async checkToken({ token }) {
    const user = await connection.promise().query(
      'SELECT token FROM users WHERE token = ?',
      [token],
    );
    return user[0][0];
  }

  static async setToken({ id }) {
    const token = jwt.sign({ id }, 'generated-key', { expiresIn: '7d' });
    await connection.promise().query(
      'UPDATE users SET token = ? WHERE id = ?',
      [token, id],
    );
    return token;
  }

  static async unsetToken({ token }) {
    const user = await connection.promise().query(
      'UPDATE users SET token = "" WHERE token = ?',
      [token],
    );
    return user;
  }

  static async remove({ id }) {
    const user = await connection.promise().query(
      'DELETE FROM users WHERE id = ?',
      [id],
    );
    return user;
  }

  static async update({
    id, name, username, email, password, phone, address, token,
  }) {
    const user = await connection.promise().query(
      'UPDATE users SET name = ?, username = ?, email = ?, password = ?, phone = ?, address = ?, token = ? WHERE id = ?',
      [name, username, email, password, phone, address, token, id],
    );
    return user;
  }

  static async verify({ id }) {
    const user = await connection.promise().query(
      'UPDATE users SET verified_at = NOW() WHERE id = ?',
      [id],
    );
    return user;
  }

  static async all() {
    const user = await connection.promise().query(
      'SELECT * FROM users',
    );
    return user[0];
  }

  static async getUserById({ id }) {
    const user = await connection.promise().query(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    return user[0][0];
  }
}

module.exports = User;
