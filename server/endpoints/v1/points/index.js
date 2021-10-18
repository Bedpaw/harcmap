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
const getPoint = require('./methods/get-point');
const editPoint = require('./methods/edit-point');
const deletePoint = require('./methods/delete-point');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/points', allPoints);
addEndpointValidation('/api/v1/events/:eventId/points/collect', collectPoint);
addEndpointValidation('/api/v1/events/:eventId/points/:pointId', onePoint);

// TODO
router.route('/')
	.get(async (request, response) => {
		const { eventId } = request.body;
		const result = await getPoints(eventId);

		response.send(result);
	})
	.post(async (request, response) => {
		const { eventId } = request.body;
		const result = await addPoint(eventId);

		response.send(result);
	});

// TODO
router.route('/collect')
	.post(async (request, response) => {
		const { eventId } = request.body;
		const result = await collect(eventId);

		response.send(result);
	});

// TODO
router.route('/:pointId')
	.get(async (request, response) => {
		const {
			eventId,
			pointId,
		} = request.body;
		const result = await getPoint(eventId, pointId);

		response.send(result);
	})
	.put(async (request, response) => {
		const {
			eventId,
			pointId,
		} = request.body;
		const result = await editPoint(eventId, pointId);

		response.send(result);
	})
	.delete(async (request, response) => {
		const {
			eventId,
			pointId,
		} = request.body;
		const result = await deletePoint(eventId, pointId);

		response.send(result);
	});

module.exports = router;
