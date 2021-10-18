const Categories = require('../../../../models/categories');
const { ObjectId } = require('mongodb');

async function getCategories (eventId) {
  const results = await Categories.getMany({ eventId: ObjectId(eventId) });

  return results.map(result => {
    delete result.eventId;

    return result;
  });

}

module.exports = getCategories;
