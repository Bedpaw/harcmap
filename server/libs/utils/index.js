const getSHA = require('./sha3');
const parseDocumentToUpdate = require('./parse-document-to-update');
const { validateMany, validateOne } = require('./validate-utils');

module.exports = {
  getSHA,
  validateOne,
  validateMany,
  parseDocumentToUpdate,
};
