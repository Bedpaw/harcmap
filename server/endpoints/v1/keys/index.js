const { Router } = require('express');
const { refresh } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const refreshKey = require('./methods/refresh-key');

const router = Router();

addEndpointValidation('/api/v1/keys/:keyId/refresh', refresh);

router.route('/:keyId/refresh')
  .post(async (request, response) => {
    const { keyId } = request.params;
    const result = await refreshKey(keyId, request.user);

    response.send(result);
  });

module.exports = router;
