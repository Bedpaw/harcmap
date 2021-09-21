const { Router } = require('express');
const requestSchema = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getEvent = require('./methods/getEvent');
const updateEvent = require('./methods/updateEvent');

const router = Router();

addEndpointValidation('/api/v1/events/:id', requestSchema);

router.route('/:id')
  .get(async (request, response) => {
    const { id } = request.params;
    const event = await getEvent(id);

    response.send(event);
  })
  .put(async (request, response) => {
    const { body } = request;
    const { id } = request.params;
    const result = await updateEvent(id, body);

    response.send(result);
  });

module.exports = router;
