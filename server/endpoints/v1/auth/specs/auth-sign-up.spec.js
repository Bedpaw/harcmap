const testEndpoint = require('../../../../tests/utils/test-endpoint');
const endpoint = '/api/v1/auth/sign-up';
const { ObjectId } = require('mongodb');

describe(endpoint, () => {
  testEndpoint(endpoint, {
    description: 'Registration should create new user',
    method: 'POST',
    body: {
      send: {
        email: 'user@domain.com',
        password: 'Password1',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'users',
      query: { email: 'user@domain.com' },
      document: {
        '_id': expect.any(Object),
        'accountActivation': {
          'isActive': false,
          'key': expect.any(String),
        },
        'accountCreated': expect.any(Number),
        'email': 'user@domain.com',
        'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
        'passwordReset': {
          'date': null,
          'key': null,
        },
        'userEvents': [],
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint(endpoint, {
    description: 'Shouldn\'t create or override user if email is already used in database',
    method: 'POST',
    expectedStatus: 400,
    body: {
      send: {
        email: 'example@domain.com',
        password: 'Password1',
      },
      expect: {
        error: 1203,
        message: 'model found document with unique field',
      },
    },
    expectInDb: {
      collectionName: 'users',
      query: { email: 'example@domain.com' },
      document: {
        '_id': ObjectId('507f1f77bcf86cd799439011'),
        'accountActivation': {
          'isActive': true,
          'key': 'abcd1234',
        },
        'accountCreated': 0,
        'email': 'example@domain.com',
        'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
        'passwordReset': {
          'date': null,
          'key': null,
        },
        'userEvents': [
          ObjectId('507f191e810c19729de860ea'),
          ObjectId('605920002c60e426288b896f'),
        ],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Shouldn\'t sign-in user if sent wrong data',
    method: 'POST',
    expectedStatus: 400,
    body: [{
      send: {},
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"email" is required',
          '"password" is required',
        ],
      },
    }, {
      send: {
        password: 'pAssword1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"email" is required',
        ],
      },
    }, {
      send: {
        email: 'not-email',
        password: 'pAssword1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"email" must be a valid email',
        ],
      },
    }, {
      send: {
        email: 'to_long_mail_address@tolongmailaddress.com',
        password: 'Password1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"email" length must be less than or equal to 24 characters long',
        ],
      },
    }, {
      send: {
        email: 'example@domain.com',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"password" is required',
        ],
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'short',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"password" with value "short" fails to match the required pattern: /^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/',
        ],
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'this_is_too_long_password_and_its_wrong_1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"password" with value "this_is_too_long_password_and_its_wrong_1" fails to match the required pattern: /^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/',
        ],
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
