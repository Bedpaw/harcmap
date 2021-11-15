const { Router } = require('express');
const {
  allPoints,
  onePoint,
  collectPoint,
} = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getPoints = require('./methods/get-points');
const addPoint = require('./methods/add-point');
const collect = require('./methods/collect');
const updatePoint = require('./methods/update-point');
const deletePoint = require('./methods/delete-point');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/points', allPoints);
addEndpointValidation('/api/v1/events/:eventId/points/collect', collectPoint);
addEndpointValidation('/api/v1/events/:eventId/points/:pointId', onePoint);

router.route('/:eventId/points')
  .get(async (request, response) => {
    const { eventId } = request.params;
    const result = await getPoints(eventId);

    response.send(result);
  })
  .post(async (request, response) => {
    const { eventId } = request.params;
    const result = await addPoint(eventId, request.body);

    response.send(result);
  });

// TODO
router.route('/:eventId/points/collect')
  .post(async (request, response) => {
    const { eventId } = request.body;
    const result = await collect(eventId);

    response.send(result);
  });

router.route('/:eventId/points/:pointId')
  .put(async (request, response) => {
    const { pointId } = request.params;
    const result = await updatePoint(pointId, request.body);

    response.send(result);
  })
  .delete(async (request, response) => {
    const { pointId } = request.params;
    const result = await deletePoint(pointId);

    response.send(result);
  });

module.exports = router;
