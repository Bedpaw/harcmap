const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events', () => {
  // testEndpoint('/api/v1/events', {
  //   description: 'Registration should create new user',
  //   method: 'POST',
  //   body: {
  //     send: {
  //       email: 'user@domain.com',
  //       password: 'Password1',
  //     },
  //     expect: {
  //       success: true,
  //     },
  //   },
  //   expectInDb: {
  //     collectionName: 'users',
  //     query: { email: 'user@domain.com' },
  //     document: {
  //       '_id': expect.any(Object),
  //       'accountActivation': {
  //         'isActive': false,
  //         'key': expect.any(String),
  //       },
  //       'accountCreated': expect.any(Number),
  //       'email': 'user@domain.com',
  //       'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
  //       'passwordReset': {
  //         'date': null,
  //         'key': null,
  //       },
  //       'userEvents': [],
  //     },
  //   },
  //   resetDbToDefault: true,
  // });

  testEndpoint('/api/v1/events', {
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
