const Categories = require('../../../../models/categories');
const Points = require('../../../../models/points');
const { ObjectId } = require('mongodb');
const {
  AppError,
  errorCodes,
} = require('../../../../libs/errors');

async function deleteCategory (eventIdString, categoryIdString) {
  const eventId = ObjectId(eventIdString);
  const categoryId = ObjectId(categoryIdString);

  const categoriesInUse = await Points.get({ pointCategoryId: categoryId, eventId });

  if (categoriesInUse) {
    throw new AppError(errorCodes.CANNOT_DELETE_IN_USE_CATEGORY, {
      httpStatus: 400,
    });
  }

  const { success } = await Categories.delete({ _id: categoryId, eventId });

  return { success };
}

module.exports = deleteCategory;
