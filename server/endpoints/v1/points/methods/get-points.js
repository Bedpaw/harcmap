const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');

async function getPoints (eventId) {
  const points = await Points.getMany({ eventId: ObjectId(eventId) });

  const results = points.map(point => ({
    pointId: point._id.toString(),
    pointName: point.pointName,
    pointType: point.pointType,
    pointCollectedDate: point.pointCollectedDate,
    pointDuration: point.pointDuration,
    pointPosition: point.pointPosition,
    pointCategoryId: point.pointCategoryId,
  }));

  return results;
}

module.exports = getPoints;
