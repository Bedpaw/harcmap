const Keys = require('../../../../models/keys');
const { ObjectId } = require('mongodb');

async function refreshKey (keyId, userData) {
  const results = await Keys.update({ _id: ObjectId(keyId) });

  // TODO ...
}

module.exports = refreshKey;
