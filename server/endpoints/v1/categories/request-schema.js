const Joi = require('joi');
const {
	categoryName,
	pointValue,
	pointShape,
} = require('../../../libs/common-schemas');

const allCategories = {
	GET: Joi.object({}),
	POST: Joi.object({
		categoryName,
		pointValue,
		pointShape,
	}),
};

module.exports = {
	allCategories,
};
