const { StatusCodes } = require('http-status-codes');
const { UserModel } = require('../models');
const { encrypt, sendResponse } = require('../utils');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        const userWithSameName = await UserModel.findOne({
            username
        });
        if (userWithSameName) {
            return sendResponse(res, StatusCodes.CONFLICT, 'user already exists');
        }

        const userWithSameEmail = await UserModel.findOne({
            email
        });
        if (userWithSameEmail) {
            return sendResponse(res, StatusCodes.CONFLICT, 'email already exists');
        }

        if (password !== confirmPassword){
            return sendResponse(res, StatusCodes.CONFLICT, 'passwords don\'t match!');
        }

        const hash = bcrypt.hashSync(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hash,
        });

        sendResponse(res, StatusCodes.CREATED, null, user);
    } catch (error) {
        sendResponse(res, null, error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({
            username
        });
        if (!user) {
            return sendResponse(res, StatusCodes.NOT_FOUND, 'user not found');
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return sendResponse(res, StatusCodes.FORBIDDEN, 'password doesn\'t match');
        }
        const token = encrypt({
            userId: user._id,
        });

        sendResponse(res, StatusCodes.Ok, null, token);
    } catch (error) {
        sendResponse(res, null, error);
    }
};

module.exports = {
    register,
    login,
};