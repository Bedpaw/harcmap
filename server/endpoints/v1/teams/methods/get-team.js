const Teams = require('../../../../models/teams');
const aggregationPipeline = require('../../../../aggregations/get-teams');
const { ObjectId } = require('mongodb');
const { secureField } = require('../../../../libs/utils');

async function getTeam (request, eventId, teamId) {
  const rolesWithAccessToInviteKeys = ['creator', 'admin', 'observer', 'teamLeader'];
  const result = await Teams.get({ _id: ObjectId(teamId) }, {
    aggregationPipeline,
  });
  const {
    teamName,
    teamColor,
    teamMembers,
    inviteKeys,
    collectedPoints,
  } = result;
  const parsedInviteKeys = inviteKeys.map(key => ({ ...key, keyId: key.keyId.toString() }));

  return {
    teamName,
    teamColor,
    teamMembers,
    inviteKeys: secureField(parsedInviteKeys, eventId, request, rolesWithAccessToInviteKeys),
    collectedPoints: collectedPoints.map(id => id.toString()),
  };
}

module.exports = getTeam;
