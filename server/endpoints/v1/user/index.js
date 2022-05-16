const { Router } = require('express');
const editUser = require('./methods/edit-user');
const { update } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');

const router = Router();

addEndpointValidation('/api/v1/user', update);

router.route('/')
  .put(async (request, response) => {
    const { body } = request;
    const updatedUser = await editUser(request, body);

    response.send(updatedUser);
  });

module.exports = router;
