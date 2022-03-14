const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');

async function deletePoint (eventId, pointId) {
  return await Points.delete({ _id: ObjectId(pointId), eventId: ObjectId(eventId) });
}

module.exports = deletePoint;
