const Events = require('../../../../models/events');
const mongodb = require('../../../../libs/mongodb');

async function updateEvent (id, eventObject) {
  console.log(eventObject);
  return await Events.update({ _id: mongodb.ObjectId(id) }, eventObject);
}

module.exports = updateEvent;
