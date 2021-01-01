const { decrypt, sendResponse } = require('../utils');
const { StatusCodes } = require('http-status-codes');

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, 'Missing token');
        }
        const claims = decrypt(token);
        req.user = claims;
        next();
    } catch (error) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
};

const payloadValidation = (schema) => (req, res, next) => {
    try {
        const value = schema.validate(req.body);
        if (value.error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, value.error);
        }
        next();
    } catch (error) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
};

module.exports = {
    requireAuth,
    payloadValidation,
};
