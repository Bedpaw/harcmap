const { Router } = require('express');
const requestSchema = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const createEvent = require('./methods/create-event');
const checkKey = require('./methods/check-key');

const router = Router();

// addEndpointValidation('/api/v1/events/:id', requestSchema);

// TODO
router.route('/')
  .post(async (request, response) => {
    const { body } = request;
    const result = await createEvent(body);

    response.send(result);
  });

// TODO
router.route('/:teamsId')
  .post(async (request, response) => {
    const { eventKey } = request.body;
    const result = await checkKey(eventKey);

    response.send(result);
  });

module.exports = router;
