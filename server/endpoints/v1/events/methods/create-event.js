const Events = require('../../../../models/events');

async function createEvent (eventData) {
  // TODO add createOne for one item
  const results = Events.create(eventData);

  // return only one event
  return results[0];
}

module.exports = createEvent;
