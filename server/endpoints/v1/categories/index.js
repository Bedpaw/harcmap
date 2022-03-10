const { Router } = require('express');
const { allCategories, oneCategory } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getCategories = require('./methods/get-categories');
const addCategory = require('./methods/add-category');
const editCategory = require('./methods/edit-category');
const deleteCategory = require('./methods/delete-category');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/categories', allCategories);
addEndpointValidation('/api/v1/events/:eventId/categories/:categoryId', oneCategory);

router.route('/:eventId/categories')
  .get(async (request, response) => {
    const { eventId } = request.params;
    const result = await getCategories(eventId);

    response.send(result);
  })
  .post(async (request, response) => {
    const { eventId } = request.params;
    const result = await addCategory(eventId, request.body);

    response.send(result);
  });

router.route('/:eventId/categories/:categoryId')
  .put(async (request, response) => {
    const { eventId, categoryId } = request.params;
    const result = await editCategory(eventId, categoryId, request.body);

    response.send(result);
  })
  .delete(async (request, response) => {
    const { eventId, categoryId } = request.params;
    const result = await deleteCategory(eventId, categoryId);

    response.send(result);
  });

module.exports = router;
