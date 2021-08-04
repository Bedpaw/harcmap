const { Router } = require('express');
const requestSchema = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getUsers = require('./methods/getUsers');
const addUser = require('./methods/addUser');
const getUser = require('./methods/getUser');
const updateUser = require('./methods/updateUser');
const deleteUser = require('./methods/deleteUser');

const router = Router();

// Add '/api/v1/users' and '/api/v1/users/:id' schema to endpoint validation
addEndpointValidation('/api/v1/users', requestSchema);
addEndpointValidation('/api/v1/users/:id', requestSchema);

router.route('/')
	.get(async (request, response) => {
		const users = await getUsers();

		response.send(users);
	})
	.post(async (request, response) => {
		const { body } = request;
		const result = await addUser(body);

		response.send(result);
	});

router.route('/:id')
	.get(async (request, response) => {
		const { id } = request.params;
		const user = await getUser(id);

		response.send(user);
	})
	.put(async (request, response) => {
		const { body } = request;
		const { id } = request.params;
		const result = await updateUser(id, body);

		response.send(result);
	})
	.delete(async (request, response) => {
		const { id } = request.params;
		const user = await deleteUser(id);

		response.send(user);
	});

module.exports = router;
