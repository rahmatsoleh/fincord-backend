// User model
// Language: javascript

const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connection = require('../config/database');
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

    static async getUser({ id, username, email, password, token }) {
        const user = await connection.promise().query(
            'SELECT id, name, username, email, password, token, verified_at, created_at, updated_at FROM users WHERE id = ? OR username = ? OR email = ? OR token = ? OR password = ?',
            [id, username, email, token, password]
        );
        return user[0][0];
    }

    static async checkToken({ token }) {
        const user = await connection.promise().query(
            'SELECT token FROM users WHERE token = ?',
            [token]
        );
        return user[0][0];
    }

    static async setToken({ id }) {
        const token = jwt.sign({ id }, 'generated-key', { expiresIn: '7d' });
        await connection.promise().query(
            'UPDATE users SET token = ? WHERE id = ?',
            [token, id]
        );
        return token;
    }

    static async unsetToken({ token }) {
        const user = await connection.promise().query(
            'UPDATE users SET token = "" WHERE token = ?',
            [token]
        );
        return user;
    }

    static async remove({ id }) {
        const user = await connection.promise().query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return user;
    }

    static async update({ id, name, username, email, password, phone, address, token }) {
        const user = await connection.promise().query(
            'UPDATE users SET name = ?, username = ?, email = ?, password = ?, phone = ?, address = ?, token = ? WHERE id = ?',
            [name, username, email, password, phone, address, token, id]
        );
        return user;
    }

    static async verify({ id }) {
        const user = await connection.promise().query(
            'UPDATE users SET verified_at = NOW() WHERE id = ?',
            [id]
        );
        return user;
    }
}

module.exports = User;