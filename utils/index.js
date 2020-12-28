const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const sendResponse = (res, httpStatus, error, data) => {
    if (error) {
        httpStatus = httpStatus || StatusCodes.INTERNAL_SERVER_ERROR;
        let message = error;

        if (httpStatus === StatusCodes.INTERNAL_SERVER_ERROR) {
            console.log(error);
            message = 'Something went bad!';
        }

        res.status(httpStatus).json({ success: false, message });
    }
    else if (!data || data.length === 0) {
        res.status(StatusCodes.NO_CONTENT).json({ success: false, message: 'Not found' });
    }
    else {
        httpStatus = httpStatus || StatusCodes.OK;
        res.status(httpStatus).json({ success: true, data });
    }
}

const encrypt = (payload) => {
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: '7d',
    });
};

const decrypt = (token) => {
    return jwt.decode(token, process.env.SECRET);
}

module.exports = {
    sendResponse,
    encrypt,
    decrypt,
}