const { Router } = require('express');
const { refresh } = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const refreshKey = require('./methods/refresh-key');

const router = Router();

addEndpointValidation('/api/v1/events/:eventId/keys/:keyId/refresh', refresh);

router.route('/:eventId/keys/:keyId/refresh')
  .post(async (request, response) => {
    const { eventId, keyId } = request.params;
    const result = await refreshKey(eventId, keyId);

    response.send(result);
  });

module.exports = router;
