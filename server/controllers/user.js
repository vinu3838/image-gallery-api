const { validationResult } = require('express-validator');
const { generateAccessToken, signUpUserService, loginUserService } = require('./../services/user');

const signUpUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const user = await signUpUserService(req.body);
        const token = generateAccessToken(user);
        res.json(token);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await loginUserService(req.body);
        const token = generateAccessToken(user);
        res.json(token);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports = {
    signUpUser,
    loginUser,
}
