const Joi = require('joi');
const {
  categoryName,
  pointValue,
  color,
} = require('../../../libs/common-schemas');

const allCategories = {
  GET: Joi.object({}),
  POST: Joi.object({
    categoryName: categoryName.required(),
    pointValue: pointValue.required(),
    pointStrokeColor: color.required(),
    pointFillColor: color.required(),
  }),
};

module.exports = {
  allCategories,
};
