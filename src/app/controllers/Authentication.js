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

        // if has token
        const old_token = await User.getUser({ username, email, password }).then(user => user.token);
        if (old_token) {
            return h.response({
                message: 'User already logged in',
                token: old_token
            }).code(200);
        }

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

        const token = await User.setToken({ id: user.id });

        return h.response({
            message: 'User logged in successfully',
            username: user.username,
            email: user.email,
            token: token
        });
    }

    static async logout(request, h) {
        // check token
        const { token } = request.headers;
        console.log(token);

        // getUser
        const user = await User.getUser({ token });
        if (!user) {
            return h.response({
                error: 'token is not valid'
            }).code(400);
        }

        const updatedUser = await User.update({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            address: user.address,
            token: ''
        });
        
        return h.response({
            message: 'User logged out successfully'
        });
    }
}

module.exports = Authentication;