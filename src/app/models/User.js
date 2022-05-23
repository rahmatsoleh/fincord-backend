// User model
// Language: javascript

const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connection = require('../config/app');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');

class User {
    static async create({name, username, email, password, phone, address}) {
        const id = nanoid.nanoid();
        const token = jwt.sign({ id }, 'generated-key', { expiresIn: '7d' });
        connection.promise().query(
            'INSERT INTO users (id, name, username, email, password ,token, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, name, username, email, password, token, phone, address]
        ).then(() => {
            return {
                id,
                name,
                username,
                email,
                phone,
                address
            };
        });
        const user = await connection.promise().query(
            'SELECT id, name, username, email, token, phone, address, created_at, updated_at FROM users WHERE id = ?',
            [id]
        );
        return user[0][0];
    }

    static async getUser({ id, username, email, password }) {
        const user = await connection.promise().query(
            'SELECT id, name, username, email, password, token, verified_at, created_at, updated_at FROM users WHERE id = ? OR username = ? OR email = ?',
            [id, username, email]
        );
        return user[0][0];
    }

    static async getToken({ id, username, email, password }) {
        const user = await connection.promise().query(
            'SELECT token FROM users WHERE id = ? OR username = ? OR email = ? AND password = ?',
            [id, username, email, password]
        );
        return user[0][0].token;
    }
}

module.exports = User;