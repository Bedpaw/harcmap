const { generateRandomStringWithoutSimilarChars } = require('../../../vendors/random');

/**
 * @description Method used to generate new keys for eventKeys or point keys
 * Generate new one and check if it doesn't already exist
 * @param model {object} - reference to model instance
 * @param fieldName {string} - name of field in model that contain keys
 * @return {string}
 */
async function generateUniqueKey (model, fieldName) {
  const newKey = generateRandomStringWithoutSimilarChars(4);

  const query = {};
  query[fieldName] = newKey;

  const result = await model.get(query);
  let key = newKey;

  if (result) {
    console.log('detected duplicate');

    key = await generateUniqueKey(model, fieldName);
  }

  return key;
}

module.exports = generateUniqueKey;
