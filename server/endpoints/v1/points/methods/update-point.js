const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');

async function updatePoint (pointId, pointNewData) {
  return await Points.update({ _id: ObjectId(pointId) }, pointNewData);
}

module.exports = updatePoint;
