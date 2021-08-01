const { Router } = require('express');
const requestSchema = require('./request-schema');
const { addEndpointValidation } = require('../libs/validation');
const {name, version} = require('../package.json');

const router = Router();

addEndpointValidation('/about', requestSchema);
// Information about application
router.route('/')
	.get((req, res) => {
		res.send({
			appServerName: name,
			appServerVersion: version,
			author: 'Paweł Jurkiewicz (https://gitlab.com/henouser)',
		});
	});

module.exports = router;
