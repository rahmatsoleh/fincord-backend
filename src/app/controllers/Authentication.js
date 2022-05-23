const User = require('../models/User');
const bcrypt = require('bcrypt');

class Authentication {
    static async register(request, h) {
        const { name, username, email, password, phone, address } = request.payload;

        // getUser
        const check = await User.getUser({ username, email });
        if (check) {
            return h.response({
                error: 'username or email is already used'
            }).code(400);
        }

        const user = await User.create({
            name,
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            phone,
            address
        });
        return h.response({ 
            message: 'User created successfully',
            username: user.username,
            email: user.email,
            token: user.token
        }).code(201);
    }

    static async login(request, h) {
        const { username, email, password } = request.payload;

        // getUser
        const user = await User.getUser({ username, email });
        if (!user) {
            return h.response({
                error: 'username or email is not registered'
            }).code(400);
        }

        // check password
        if (!bcrypt.compareSync(password, user.password)) {
            return h.response({
                error: 'password is incorrect'
            }).code(400);
        }

        return h.response({
            message: 'User logged in successfully',
            username: user.username,
            email: user.email,
            token: user.token
        });
    }
}

module.exports = Authentication;