const { Router } = require('express');
const { usersRequestSchema, userRequestSchema } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const getUsers = require('./methods/get-users');
const activateUser = require('./methods/activate-user');
const requestResetPassword = require('./methods/request-reset-password');
const resetPassword = require('./methods/reset-password');
const getUser = require('./methods/get-user');
const updateUser = require('./methods/update-user');

const router = Router();

addEndpointValidation('/api/v1/users', usersRequestSchema);
addEndpointValidation('/api/v1/users/:id', userRequestSchema);

router.route('/')
  .get(async (request, response) => {
    const { eventId } = request.query;
    const users = await getUsers(eventId);

    response.send(users);
  });

// TODO
router.route('/account-activation/:key')
  .get(activateUser);

// TODO
router.route('/reset-password')
  .post(async (request, response) => {
    const { email } = request.body;

    await requestResetPassword(email);

    response.send({ success: true });
  });

// TODO
router.route('/reset-password/:key')
  .get(async (request, response) => {

    response.send('here will be HTML page');
  })
  .post(async (request, response) => {
    const { key } = request.params;
    const { password } = request.body;

    const result = await resetPassword(key, password);

    response.send(result);
  });

router.route('/:id')
  .get(async (request, response) => {
    const { id } = request.params;
    const user = await getUser(id);

    response.send(user);
  })
  // TODO
  .put(async (request, response) => {
    const { body } = request;
    const { id } = request.params;
    const result = await updateUser(id, body);

    response.send(result);
  });

module.exports = router;
