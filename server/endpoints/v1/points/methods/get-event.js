const Events = require('../../../../models/events');
const mongodb = require('../../../../libs/mongodb');

async function getEvent (id) {
	const event = await Events.get({ _id: mongodb.ObjectId(id) });
	const {
		eventName,
		eventKey,
		eventDuration,
		mapProperties,
		eventRefreshTime,
	} = event;

	return {
		eventName,
		eventKey,
		eventDuration,
		mapProperties,
		eventRefreshTime,
	};
}

module.exports = getEvent;
