const Point = require('../../../../models/points');
const { ObjectId } = require('mongodb');
const { generateRandomStringWithoutSimilarChars } = require('../../../../../vendors/random');

async function addPoint (eventIdString, data) {
  const eventId = ObjectId(eventIdString);
  const pointCategoryId = ObjectId(data.pointCategoryId);

  delete data.pointCategoryId;

  // TODO validate if pointKey doesnt exist
  const dataToInsert = {
    ...data,
    eventId,
    pointName: data.pointName || null,
    pointCategoryId,
    pointCollectedDate: null,
    pointKey: generateRandomStringWithoutSimilarChars(4),
    pointDescription: data.pointDescription || null,
    pointSuccessMessage: data.pointSuccessMessage || null,
  };
  const results = await Point.create(dataToInsert);

  // create only one point so take one result
  const point = results.data[0];

  point.pointId = point._id;

  delete point._id;
  delete point.eventId;

  return point;
}

module.exports = addPoint;
