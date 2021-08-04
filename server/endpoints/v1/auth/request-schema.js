const Joi = require('joi');
const {
	email, username, password,
} = require('../../../libs/common-schemas');

// login
const signInSchema = {
	POST: Joi.object({
		username: username.required(),
		password: password.required(),
	}),
};

// logout
const signOutSchema = {
	POST: Joi.object({}),
};

// registration
const signUpSchema = {
	POST: Joi.object({
		username: username.required(),
		email: email.required(),
		password: password.required(),
	}),
};

module.exports = {
	signInSchema,
	signUpSchema,
	signOutSchema,
};
