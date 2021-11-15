const Teams = require('../../../../models/teams');
const aggregationPipeline = require('../../../../aggregations/get-teams');
const { ObjectId } = require('mongodb');

async function getTeam (eventId, teamId) {
  const result = await Teams.get({ _id: ObjectId(teamId) }, {
    aggregationPipeline,
  });
  const {
    teamName,
    teamMembers,
    inviteKeys,
    collectedPoints,
  } = result;

  return {
    teamName,
    teamMembers,
    inviteKeys: inviteKeys.map(key => ({ ...key, keyId: key.keyId.toString() })),
    collectedPoints: collectedPoints.map(id => id.toString()),
  };
}

module.exports = getTeam;
