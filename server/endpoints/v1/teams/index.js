const { Router } = require('express');
const { allTeams, oneTeam } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getTeams = require('./methods/get-teams');
const getTeam = require('./methods/get-team');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/teams', allTeams);
addEndpointValidation('/api/v1/events/:eventId/teams/:teamId', oneTeam);

router.route('/:eventId/teams')
  .get(async (request, response) => {
    const { eventId } = request.params;
    const result = await getTeams(eventId, request);

    response.send(result);
  });

router.route('/:eventId/teams/:teamId')
  .get(async (request, response) => {
    const { eventId, teamId } = request.params;
    const result = await getTeam(request, eventId, teamId);

    response.send(result);
  });

module.exports = router;
