const Teams = require('../../../../models/teams');
const aggregationPipeline = require('../../../../aggregations/get-teams');
const { ObjectId } = require('mongodb');

async function getTeams (eventId) {
  const results = await Teams.getMany({ eventId: ObjectId(eventId) }, {
    aggregationPipeline,
  });

  return results.map(result => {
    const {
      _id,
      teamName,
      teamMembers,
      collectedPoints,
    } = result;

    return {
      teamId: _id,
      teamName,
      teamMembers,
      collectedPoints: collectedPoints.map(id => id.toString()),
    };
  });
}

module.exports = getTeams;
