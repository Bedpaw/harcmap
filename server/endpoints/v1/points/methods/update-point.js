const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');

async function updatePoint (pointId, data) {
  const pointNewData = {
    ...data,
    pointCategoryId: ObjectId(data.pointCategoryId),
  };
  return await Points.update({ _id: ObjectId(pointId) }, pointNewData);
}

module.exports = updatePoint;
