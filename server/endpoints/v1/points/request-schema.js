const Joi = require('joi');
const {
	pointName,
	pointType,
	date,
	mapCoordinates,
	objectId,
	pointKey,
} = require('../../../libs/common-schemas');

const onePoint = {
	GET: Joi.object({}),
	PUT: Joi.object({
		pointName: pointName,
		pointType: pointType,
		pointDuration: {
			startDate: date,
			endDate: date,
		},
		pointPosition: {
			longitude: mapCoordinates,
			latitude: mapCoordinates,
		},
		pointCategoryId: objectId,
	}),
	DELETE: Joi.object({}),
};

const collectPoint = {
	POST: Joi.object({
		pointKey: pointKey.required(),
	}),
};

const allPoints = {
	GET: Joi.object({}),
	POST: Joi.object({
		pointName: pointName.required(),
		pointType: pointType.required(),
		pointDuration: {
			startDate: date.required(),
			endDate: date.required(),
		},
		pointPosition: {
			longitude: mapCoordinates.required(),
			latitude: mapCoordinates.required(),
		},
		pointCategoryId: objectId.required(),
	}),
};

module.exports = {
	allPoints,
	onePoint,
	collectPoint,
};
