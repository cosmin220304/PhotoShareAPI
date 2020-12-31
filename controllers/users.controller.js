const { StatusCodes } = require('http-status-codes');
const { UserModel } = require('../models');
const { sendResponse } = require('../utils');

const getUser = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await UserModel.findOne({
            _id : userId
        });
        if (!user) {
            return sendResponse(res, StatusCodes.NOT_FOUND, 'user not found');
        }

        const {password, ...returnUser} = user._doc;

        sendResponse(res, StatusCodes.OK, null, returnUser);

    } catch (error) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
};

module.exports = {
    getUser,
}