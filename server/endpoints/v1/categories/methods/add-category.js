const Categories = require('../../../../models/categories');
const { ObjectId } = require('mongodb');

async function addCategory (eventIdString, data) {
  const eventId = ObjectId(eventIdString);
  const dataToInsert = { ...data, eventId };
  // TODO create ONE
  const results = await Categories.create(dataToInsert);
  // created only one category so take only one result
  const category = results.data[0];

  category.categoryId = category._id;

  delete category._id;
  delete category.eventId;

  return category;
}

module.exports = addCategory;
