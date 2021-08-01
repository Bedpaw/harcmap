const getSHA = require('./sha3');
const { validateMany, validateOne } = require('./validate-utils');

module.exports = {
	getSHA,
	validateOne,
	validateMany,
};
