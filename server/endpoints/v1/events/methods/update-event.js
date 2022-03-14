const Events = require('../../../../models/events');
const { ObjectId } = require('mongodb');

async function updateEvent (id, eventObject) {
  return await Events.update({ _id: ObjectId(id) }, eventObject);
}

module.exports = updateEvent;
