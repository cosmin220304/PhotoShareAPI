const { StatusCodes } = require('http-status-codes');
const { PhotoModel } = require('../models');
const { sendResponse } = require('../utils');
const { Types } = require('mongoose');

const create = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, base64, description } = req.body;

        const photo = await PhotoModel.create({
            title,
            base64,
            description,
            userId,
        });

        sendResponse(res, StatusCodes.CREATED, null, photo);

    } catch (error) {
        sendResponse(res, null, error);
    }
};

const getAll = async (req, res) => {
    try {
        const photos = await PhotoModel.find({});

        sendResponse(res, null, null, photos);

    } catch (error) {
        sendResponse(res, null, error);
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Types.ObjectId.isValid(id)) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Id');
        }

        const photo = await PhotoModel.findOne({
            _id: id
        });

        sendResponse(res, null, null, photo);

    } catch (error) {
        sendResponse(res, null, error);
    }
}

const getRandom = async (req, res) => {
    try {
        const count = await PhotoModel.countDocuments();
        const random = Math.floor(Math.random() * count);
        const photo = await PhotoModel.findOne({}, null, { skip: random });
        sendResponse(res, null, null, photo);

    } catch (error) {
        sendResponse(res, null, error);
    }
};

const update = async (req, res) => {
    try {
        const photoId = req.params.id;
        if (!Types.ObjectId.isValid(photoId)) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Id');
        }

        const photo = await PhotoModel.findOne({
            _id: photoId
        });
        if (!photo) {
            return sendResponse(res, StatusCodes.NO_CONTENT, 'No photo found!');
        }

        let { title, base64, description, userId } = req.body;

        if (userId != req.user.userId) {
            return sendResponse(res, StatusCodes.FORBIDDEN, 'It\'s not your photo!');
        }

        let updatedPhoto = {
            title: title || photo.title,
            base64: base64 || photo.base64,
            description: description || photo.description,
        }

        await PhotoModel.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    ...updatedPhoto
                }
            }
        );

        sendResponse(res, null, null, updatedPhoto);

    } catch (error) {
        sendResponse(res, null, error);
    }
};

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Types.ObjectId.isValid(id)) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Id');
        }

        const photo = await PhotoModel.findOne({
            _id: id
        });
        if (!photo) {
            return sendResponse(res, StatusCodes.NO_CONTENT, null);
        }

        if (photo.userId != req.user.userId) {
            return sendResponse(res, StatusCodes.FORBIDDEN, 'It\'s not your photo!');
        }

        await PhotoModel.deleteOne({
            _id: id
        });

        sendResponse(res, StatusCodes.OK, null, photo);

    } catch (error) {
        sendResponse(res, null, error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    getRandom,
    update,
    deleteById,
};