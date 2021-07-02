const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

const generateAccessToken = ({ _id, isAdmin }) => {
    // eslint-disable-next-line no-undef
    return jwt.sign({ userId: _id.toString(), isAdmin }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

const signUpUserService = async ({ name, email, password, isAdmin }) => {
    const user = await User.findOne({ email: email });
    if (user) {
        const error = new Error('User already present');
        error.statusCode = 409;
        throw error;
    }
    const newuser = new User({ name, email, password, isAdmin });
    const salt = await bcrypt.genSalt(12);
    newuser.password = await bcrypt.hash(newuser.password, salt);
    return newuser.save();
}

const loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = new Error('User not found, do Signup');
        error.statusCode = 404;
        throw error;
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
    }
    return user;
}

module.exports = {
    generateAccessToken,
    signUpUserService,
    loginUserService,
}