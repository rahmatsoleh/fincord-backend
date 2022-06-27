const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { nanoid } = require('nanoid');
const User = require('../models/User');
const sendEmail = require('../config/smtp');
const CategoryDefault = require('../models/CategoryDefault');
const Category = require('../models/Category');

class Authentication {
  static async register(request, h) {
    const {
      name, username, email, password, phone, address,
    } = request.payload;

    // getUser
    const check = await User.getUser({ username, email });
    if (check) {
      return h.response({
        error: true,
        message: 'username or email is already used',
      }).code(400);
    }

    const usernameFromEmail = email.split('@')[0];
    const user = await User.create({
      name,
      username: username || usernameFromEmail,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    // get category default
    const categoryDefault = await CategoryDefault.all();

    categoryDefault.forEach(async (category) => {
      await Category.create({
        id: nanoid(),
        user_id: user.id,
        name: category.name,
        type: category.type,
      });
    });

    return h.response({
      error: false,
      message: 'User created successfully',
      data: user,
    }).code(201);
  }

  static async login(request, h) {
    if (request.payload.token) {
      const user = await User.AuthWithToken({ token: request.payload.token });
      if (!user) {
        return h.response({
          error: true,
          message: 'Invalid token',
        }).code(400);
      }

      return h.response({
        error: false,
        message: 'Login successfully',
        data: user,
      }).code(200);
    }

    const { username, email, password } = request.payload;
    console.log('payload', request.payload);
    let user = null;

    if (username) {
      user = await User.authWithUsername({ username, password });
      if (!user) {
        return h.response({
          error: true,
          message: 'username or password is wrong',
        }).code(400);
      }
    }
    if (email) {
      user = await User.authWithEmail({ email, password });
      if (!user) {
        return h.response({
          error: true,
          message: 'email or password is wrong',
        }).code(400);
      }
    }

    console.log(user);
    return h.response({
      error: false,
      message: 'Login successfully',
      id: user.id,
      email: user.email,
      password,
      data: user,
    }).code(200);
  }

  // check token, if same refresh token, update token, if not, return error
  static async refreshToken(request, h) {
    const token = request.headers['x-token'];
    const user = await User.checkToken({ token });
    if (!user) {
      return h.response({
        error: true,
        message: 'token is wrong',
      }).code(400);
    }

    const newToken = await User.setToken({ token });
    return h.response({
      error: false,
      message: 'Token updated',
      token: newToken,
      id: user.id,
      email: user.email,
      password: user.password,
      data: user,
    }).code(200);
  }

  static async logout(request, h) {
    // get x-token from header
    const token = request.headers['x-token'];
    console.log(token);
    // getUser
    const user = await User.checkToken({ token });
    if (!user) {
      return h.response({
        error: 'unauthorized',
      }).code(401);
    }
    const updatedUser = await User.unsetToken({ token });

    return h.response({
      message: 'User logged out successfully',
    });
  }

  static async sendVerification(request, h) {
    const token = request.headers['x-token'];

    // getUser
    const user = await User.getUser({ token });

    if (!user) {
      return h.response({
        error: 'unauthorized',
      }).code(401);
    }

    // check if verified
    if (user.verified_at) {
      return h.response({
        error: 'user already verified',
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
            `,
    });

    return h.response({
      message: 'Verification email sent',
    });
  }

  static async verify(request, h) {
    const token = request.params;

    // getUser
    const user = await User.getUser({ token });

    if (!user) {
      return h.response({
        error: 'unauthorized',
      }).code(401);
    }

    // check if verified
    if (user.verified_at) {
      return h.response({
        error: 'user already verified',
      }).code(400);
    }

    // set verified
    const updatedUser = await User.verify({ id: user.id });

    return h.response({
      message: 'Email verified',
    }).code(200);
  }

  static async forgotPassword(request, h) {
    const { email } = request.payload;

    // getUser
    const user = await User.getUser({ email });

    if (!user) {
      return h.response({
        error: 'email is invalid',
      }).code(400);
    }

    // set token
    const token = await User.setToken({ id: user.id });

    await sendEmail({
      to: email,
      subject: 'Reset Password',
      message: `
                <h1>Reset Password</h1>
                <p>
                    Please click the link below to reset your password.
                </p>
                <a href="${dotenv.config().parsed.APP_FULLHOST}/reset/${token}">Reset Password</a>
                <p>
                    or copy and paste this link into your browser:
                </p>
                <p>
                    ${dotenv.config().parsed.APP_FULLHOST}/reset/${token}
                </p>
            `,
    });

    return h.response({
      message: 'Reset password email sent',
      token,
    });
  }

  static async resetPassword(request, h) {
    const token = request.params;
    const { password } = request.payload;

    // getUser
    const user = await User.checkToken({ token });

    if (!user) {
      return h.response({
        error: 'token is invalid or expired',
      }).code(400);
    }

    // set password
    const updatedUser = await User.update({
      token,
      password: bcrypt.hashSync(password, 10),
    });

    // unset token
    await User.unsetToken({ token });

    return h.response({
      message: 'Password updated',
    });
  }
}

module.exports = Authentication;
