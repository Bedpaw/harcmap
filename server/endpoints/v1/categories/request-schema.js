const Joi = require('joi');
const {
  categoryName,
  pointValue,
  color,
  categoryDescription,
} = require('../../../libs/common-schemas');

const allCategories = {
  GET: Joi.object({}),
  POST: Joi.object({
    categoryName: categoryName.required(),
    pointValue: pointValue.required(),
    pointStrokeColor: color.required(),
    pointFillColor: color.required(),
    categoryDescription: categoryDescription,
  }),
};

const oneCategory = {
  PUT: Joi.object({
    categoryName: categoryName,
    pointValue: pointValue,
    pointStrokeColor: color,
    pointFillColor: color,
    categoryDescription: categoryDescription,
  }),
  DELETE: Joi.object({}),
};

module.exports = {
  allCategories,
  oneCategory,
};
