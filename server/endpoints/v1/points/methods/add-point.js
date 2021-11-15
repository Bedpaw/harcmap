const Point = require('../../../../models/points');
const { ObjectId } = require('mongodb');
const { generateRandomStringWithoutSimilarChars } = require('../../../../../vendors/random');

async function addPoint (eventIdString, data) {
  const eventId = ObjectId(eventIdString);
  const pointCategoryId = ObjectId(data.pointCategoryId);

  delete data.pointCategoryId;

  const dataToInsert = {
    ...data,
    eventId,
    pointCategoryId,
    pointCollectedDate: null,
    pointKey: generateRandomStringWithoutSimilarChars(4),
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
