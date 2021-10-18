const { Router } = require('express');
const {
	allTeams,
	oneTeam,
} = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getTeams = require('./methods/get-teams');
const getTeam = require('./methods/get-team');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/teams', allTeams);
addEndpointValidation('/api/v1/events/:eventId/teams/:teamsId', oneTeam);

// TODO
router.route('/')
	.get(async (request, response) => {
		const { eventId } = request.body;
		const result = await getTeams(eventId);

		response.send(result);
	});

// TODO
router.route('/:teamsId')
	.get(async (request, response) => {
		const {
			eventId,
			teamId,
		} = request.body;
		const result = await getTeam(eventId, teamId);

		response.send(result);
	});

module.exports = router;
