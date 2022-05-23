const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const process = 'generated-key';

class Authentication {
    static async register(request, h) {
        const { name, username, email, password } = request.payload;
        // console.log(request.payload);

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
            password: bcrypt.hashSync(password, 10)
        });
        return h.response({ 
            message: 'User created successfully',
            username: user.username,
            email: user.email,
            token: user.token
        }).code(201);
    }
}

module.exports = Authentication;