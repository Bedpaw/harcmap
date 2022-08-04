const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');
const { secureField } = require('../../../../libs/utils');

async function getPoints (request, eventId) {
  const points = await Points.getMany({ eventId: ObjectId(eventId) });

  const results = points.map(point => ({
    pointId: point._id.toString(),
    pointKey: secureField(point.pointKey, eventId, request),
    pointName: point.pointName,
    pointType: point.pointType,
    pointCollectedDate: point.pointCollectedDate,
    pointDuration: point.pointDuration,
    pointPosition: point.pointPosition,
    pointCategoryId: point.pointCategoryId,
    pointDescription: point.pointDescription,
    pointSuccessMessage: point.pointSuccessMessage,
  }));

  return results;
}

module.exports = getPoints;
