const testEndpoint = require('../../../../tests/utils/test-endpoint');
const endpoint = '/api/v1/auth/sign-out';

describe(endpoint, () => {
  testEndpoint(endpoint, {
    description: 'Should logout user',
    signIn: {
      email: 'user5@harcmap.pl',
      password: 'Password1',
    },
    method: 'POST',
    body: {
      expect: {
        success: true,
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Failed if user is not login',
    method: 'POST',
    expectedStatus: 401,
    body: {
      expect: {
        'error': 1105,
        'message': 'cannot logout unauthorized user',
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for wrong fields in body',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'POST',
    expectedStatus: 400,
    body: {
      send: {
        wrongField: 'someData',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"wrongField" is not allowed'],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'PUT', 'DELETE', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
