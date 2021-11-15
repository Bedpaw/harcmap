const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');

async function deletePoint (pointId) {
  return await Points.delete({ _id: ObjectId(pointId) });
}

module.exports = deletePoint;
