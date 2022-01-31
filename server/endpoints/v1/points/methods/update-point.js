const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');

async function updatePoint (eventId, pointId, data) {
  const pointNewData = {
    ...data,
    pointCategoryId: ObjectId(data.pointCategoryId),
  };
  const { success } = await Points.update({ _id: ObjectId(pointId), eventId: ObjectId(eventId) }, pointNewData);

  return {
    success,
  };
}

module.exports = updatePoint;
