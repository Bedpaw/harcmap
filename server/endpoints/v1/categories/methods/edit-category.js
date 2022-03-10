const Categories = require('../../../../models/categories');
const { ObjectId } = require('mongodb');

async function editCategory (eventIdString, categoryIdString, data) {
  const eventId = ObjectId(eventIdString);
  const categoryId = ObjectId(categoryIdString);
  const { success } = await Categories.update({ _id: categoryId, eventId }, data);

  return { success };
}

module.exports = editCategory;
