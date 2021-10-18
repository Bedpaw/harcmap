const Joi = require('joi');
const {
	objectId,
	teamName,
	eventName,
	date,
	mapCoordinates,
	eventRefreshTime,
	mapZoom,
	eventKey,
} = require('../../../libs/common-schemas');

// empty schema means that no data can be pass
const allEvents = {
	POST: Joi.object({
		eventName: eventName.required(),
		eventDuration: {
			startDate: date.required(),
			endDate: date.required(),
		},
		mapProperties: {
			zoom: mapZoom.required(),
			longitude: mapCoordinates.required(),
			latitude: mapCoordinates.required(),
		},
		eventRefreshTime: eventRefreshTime.required(),
	}),
};

const oneEvent = {
	GET: Joi.object({}),
	PUT: Joi.object({
		eventName,
		eventDuration: {
			startDate: date,
			endDate: date,
		},
		mapProperties: {
			zoom: mapZoom,
			longitude: mapCoordinates,
			latitude: mapCoordinates,
		},
		eventRefreshTime,
	}),
};

const check = {
	POST: Joi.object({
		eventKey: eventKey.required(),
	}),
};

const join = {
	POST: Joi.object({
		userId: objectId.required(),
		eventKey: eventKey.required(),
		teamName: teamName.required(),
	}),
};

module.exports = {
	allEvents,
	oneEvent,
	check,
	join,
};
