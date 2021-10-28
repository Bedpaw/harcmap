const Joi = require('joi');
const {
  categoryName,
  pointValue,
  pointShape,
  objectIdInRequest,
} = require('../../../libs/common-schemas');

const allCategories = {
  GET: Joi.object({}),
  POST: Joi.object({
    eventId: objectIdInRequest.required(),
    categoryName: categoryName.required(),
    pointValue: pointValue.required(),
    pointShape: pointShape.required(),
  }),
};

module.exports = {
  allCategories,
};
