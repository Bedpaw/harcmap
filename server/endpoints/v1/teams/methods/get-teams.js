const Teams = require('../../../../models/teams');
const aggregationPipeline = require('../../../../aggregations/get-teams');
const { ObjectId } = require('mongodb');
const { secureField } = require('../../../../libs/utils');

async function getTeams (eventId, request) {
  const results = await Teams.getMany({ eventId: ObjectId(eventId) }, {
    aggregationPipeline,
  });

  return results.map(result => {
    const {
      _id,
      teamName,
      teamColor,
      teamMembers,
      inviteKeys,
      collectedPoints,
    } = result;
    const parsedInviteKeys = inviteKeys.map(key => ({ ...key, keyId: key.keyId.toString() }));

    return {
      teamId: _id,
      teamName,
      teamColor,
      teamMembers,
      inviteKeys: secureField(parsedInviteKeys, eventId, request),
      collectedPoints: collectedPoints.map(id => id.toString()),
    };
  });
}

module.exports = getTeams;
