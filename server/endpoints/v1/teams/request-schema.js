const Joi = require('joi');
const {
	eventDurationDate,
	mapCoordinate,
	eventName,
	eventKey,
	mapRefreshTime,
	defaultMapZoom,
} = require('../../../libs/common-schemas');

// empty schema means that no data can be pass
const GET = Joi.object({});

// "required" method is necessary in most POST methods
const POST = Joi.object({});

// put(update) data rather dont need to be "required"
const PUT = Joi.object({
	eventName,
	eventKey,
	eventDuration: {
		startDate: eventDurationDate,
		endDate: eventDurationDate,
	},
	mapProperties: {
		zoom: defaultMapZoom,
		longitude: mapCoordinate,
		latitude: mapCoordinate,
	},
	eventRefreshTime: mapRefreshTime,
});

// empty schema means that no data can be pass
const DELETE = Joi.object({});

const schema = {
	GET,
	POST,
	PUT,
	DELETE,
};

module.exports = schema;
