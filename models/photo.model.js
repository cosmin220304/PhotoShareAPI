const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        base64: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    }
);

const PhotoModel = new model('photos', PhotoSchema);

module.exports = {
    PhotoModel,
};