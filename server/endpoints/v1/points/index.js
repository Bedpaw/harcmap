const { Router } = require('express');
const {
  allPoints,
  onePoint,
  collect,
} = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getPoints = require('./methods/get-points');
const addPoint = require('./methods/add-point');
const collectPoint = require('./methods/collect-point');
const updatePoint = require('./methods/update-point');
const deletePoint = require('./methods/delete-point');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/points', allPoints);
addEndpointValidation('/api/v1/events/:eventId/points/collect', collect);
addEndpointValidation('/api/v1/events/:eventId/points/:pointId', onePoint);

router.route('/:eventId/points')
  .get(async (request, response) => {
    const { eventId } = request.params;
    const result = await getPoints(request, eventId);

    response.send(result);
  })
  .post(async (request, response) => {
    const { eventId } = request.params;
    const result = await addPoint(eventId, request.body);

    response.send(result);
  });

router.route('/:eventId/points/collect')
  .post(async (request, response) => {
    const { eventId } = request.params;
    const { pointKey } = request.body;
    const result = await collectPoint(request, eventId, pointKey);

    response.send(result);
  });

router.route('/:eventId/points/:pointId')
  .put(async (request, response) => {
    const { eventId, pointId } = request.params;
    const result = await updatePoint(eventId, pointId, request.body);

    response.send(result);
  })
  .delete(async (request, response) => {
    const { eventId, pointId } = request.params;
    const result = await deletePoint(eventId, pointId);

    response.send(result);
  });

module.exports = router;
