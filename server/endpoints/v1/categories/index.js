const { Router } = require('express');
const { allCategories } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getCategories = require('./methods/get-categories');
const addCategory = require('./methods/add-category');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/categories', allCategories);

// TODO
router.route('/:eventId/categories')
  .get(async (request, response) => {
    const { eventId } = request.params;
    const result = await getCategories(eventId);

    response.send(result);
  })
  .post(async (request, response) => {
    const { eventId } = request.params;
    const result = await addCategory(eventId);

    response.send(result);
  });

module.exports = router;
