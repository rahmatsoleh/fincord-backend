const User = require('../models/User');
const bcrypt = require('bcrypt');
const sendEmail = require('../config/smtp');
const dotenv = require('dotenv');

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

        // getUser
        const user = await User.checkToken({ token: token });
        if (!user) {
            return h.response({
                error: 'unauthorized'
            }).code(401);
        } else {   
            const updatedUser = await User.unsetToken({ token: token });
            
            return h.response({
                message: 'User logged out successfully'
            });
        }
    }

    static async sendVerification(request, h){
        const { token } = request.headers;

        // getUser
        const user = await User.getUser({ token: token });

        if (!user) {
            return h.response({
                error: 'unauthorized'
            }).code(401);
        }

        // check if verified
        if (user.verified_at) {
            return h.response({
                error: 'user already verified'
            }).code(400);
        }

        // send email
        const email = await user.email;
        await sendEmail({
            to: email,
            subject: 'Verification Email',
            message: `
                <h1>Verification Email</h1>
                <p>
                    Please click the link below to verify your email address.
                </p>
                <a href="${dotenv.config().parsed.APP_FULLHOST}/verify/${token}">Verify</a>
                <p>
                    or copy and paste this link into your browser:
                </p>
                <p>
                    ${dotenv.config().parsed.APP_FULLHOST}/verify/${token}
                </p>
            `
        });

        return h.response({
            message: 'Verification email sent'
        });
    }

    static async verify(request, h){
        const { token } = request.params;

        // getUser
        const user = await User.getUser({ token: token });

        if (!user) {
            return h.response({
                error: 'unauthorized'
            }).code(401);
        }

        // check if verified
        if (user.verified_at) {
            return h.response({
                error: 'user already verified'
            }).code(400);
        }

        // set verified
        const updatedUser = await User.verify({ id: user.id });

        return h.response({
            message: 'Email verified'
        }).code(200);
    }
}

module.exports = Authentication;