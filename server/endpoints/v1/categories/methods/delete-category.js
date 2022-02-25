const Categories = require('../../../../models/categories');
const { ObjectId } = require('mongodb');

async function deleteCategory (eventIdString, categoryIdString) {
  const eventId = ObjectId(eventIdString);
  const categoryId = ObjectId(categoryIdString);
  const { success } = await Categories.delete({ _id: categoryId, eventId });

  return { success };
}

module.exports = deleteCategory;
