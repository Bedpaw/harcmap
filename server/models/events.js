const Joi = require('joi');

const Model = require('../libs/model');
const {
	eventName,
	eventKey,
	date,
	defaultMapZoom,
	mapCoordinates,
	mapRefreshTime,
} = require('../libs/common-schemas');

// event schema
const eventSchema = {
	eventName,
	eventKey,
	pointsCollectionName: Joi.string(),
	categoriesCollectionName: Joi.string(),
	eventDuration: {
		startDate: date,
		endDate: date,
	},
	mapProperties: {
		zoom: defaultMapZoom,
		longitude: mapCoordinates,
		latitude: mapCoordinates,
	},
	eventRefreshTime: mapRefreshTime,
};

// Create model
const Events = new Model('events', eventSchema);

module.exports = Events;
