const Joi = require('joi');

const {
	email,
	username,
	role,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// User schema
const userSchema = {
	email,
	username,
	password: Joi.string(),
	role,
};

// Create model
const Users = new Model('users', userSchema);

module.exports = Users;
