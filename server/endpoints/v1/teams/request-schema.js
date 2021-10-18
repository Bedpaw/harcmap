const Joi = require('joi');

const allTeams = {
	GET: Joi.object({}),
};
const oneTeam = {
	GET: Joi.object({}),
};

module.exports = {
	allTeams,
	oneTeam,
};
