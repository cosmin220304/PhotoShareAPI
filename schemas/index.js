const Joi = require('joi');

const login = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')).required(),
});

const register = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')).required(),
    confirmPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')).required(),
});

const photoCreate = Joi.object({
    title: Joi.string().required(),
    base64: Joi.string().base64().required(),
    description: Joi.string(),
});

const photoUpdate = Joi.object({
    title: Joi.string(),
    base64: Joi.string().base64(),
    description: Joi.string(),
});

module.exports = {
    login,
    register,
    photoCreate,
    photoUpdate,
};