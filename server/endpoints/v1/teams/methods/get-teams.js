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
      inviteKeys,
      collectedPoints,
    } = result;
    const parsedInviteKeys = inviteKeys.map(key => ({ ...key, keyId: key.keyId.toString() }));

    return {
      teamId: _id,
      teamName,
      teamMembers,
      inviteKeys: parsedInviteKeys,
      collectedPoints: collectedPoints.map(id => id.toString()),
    };
  });
}

module.exports = getTeams;
