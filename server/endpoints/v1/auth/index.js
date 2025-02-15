const { Router } = require('express');
const {
  signUpSchema,
  signInSchema,
  signOutSchema,
} = require('./request-schema');
const { addEndpointValidation } = require('../../../libs/validation');
const signIn = require('./methods/sign-in');
const signUp = require('./methods/sign-up');
const signOut = require('./methods/sign-out');

const router = Router();

addEndpointValidation('/api/v1/auth/sign-up', signUpSchema);
addEndpointValidation('/api/v1/auth/sign-in', signInSchema);
addEndpointValidation('/api/v1/auth/sign-out', signOutSchema);

// registration
router.route('/sign-up')
  .post(async (request, response) => {
    const { body } = request;
    const result = await signUp(body);

    response.send(result);
  });

// login
router.route('/sign-in')
  .post(signIn);

// logout
router.route('/sign-out')
  .post(signOut);

module.exports = router;
