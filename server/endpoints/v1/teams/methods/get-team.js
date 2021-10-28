const Teams = require('../../../../models/teams');
const aggregationPipeline = require('../../../../aggregations/get-teams');
const { ObjectId } = require('mongodb');

async function getTeam (eventId, teamId) {
  const result = await Teams.get({ _id: ObjectId(teamId), eventId: ObjectId(eventId) }, {
    aggregationPipeline,
  });
  const {
    teamName,
    teamMembers,
    collectedPoints,
  } = result;

  return {
    teamName,
    teamMembers,
    collectedPoints: collectedPoints.map(id => id.toString()),
  };
}

module.exports = getTeam;
