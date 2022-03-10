const { Router } = require('express');
const {
  allEvents,
  oneEvent,
  check,
  join,
} = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const createEvent = require('./methods/create-event');
const checkKey = require('./methods/check-key');
const joinEvent = require('./methods/join-event');
const getEvent = require('./methods/get-event');
const updateEvent = require('./methods/update-event');

const router = Router();

addEndpointValidation('/api/v1/events', allEvents);
addEndpointValidation('/api/v1/events/check', check);
addEndpointValidation('/api/v1/events/join', join);
addEndpointValidation('/api/v1/events/:eventId', oneEvent);

router.route('/')
  .post(async (request, response) => {
    const { body } = request;
    const result = await createEvent(request, body);

    response.send(result);
  });

router.route('/check')
  .post(async (request, response) => {
    const { eventKey, userId, teamName } = request.body;
    const result = await checkKey(request, eventKey, userId, teamName);

    response.send(result);
  });

router.route('/join')
  .post(async (request, response) => {
    const { body } = request;
    const result = await joinEvent(request, body);

    response.send(result);
  });

router.route('/:id')
  .get(async (request, response) => {
    const { id } = request.params;
    const event = await getEvent(id, request);

    response.send(event);
  })
  .put(async (request, response) => {
    const { body } = request;
    const { id } = request.params;
    const result = await updateEvent(id, body);

    response.send(result);
  });

module.exports = router;
