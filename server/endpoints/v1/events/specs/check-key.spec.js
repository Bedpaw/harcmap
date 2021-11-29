const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/check', () => {
  testEndpoint('/api/v1/events/check', {
    description: 'Return information for hd5b event key',
    method: 'POST',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    body: {
      send: {
        eventKey: 'hd5b',
      },
      expect: {
        'eventId': '605920002c60e426288b8971',
        'role': 'teamMember',
        'teamId': '60e6b02e0b6c6887accf6c05',
      },
    },
  });

  testEndpoint('/api/v1/events/check', {
    description: 'Return error for none exist key',
    method: 'POST',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        eventKey: 'eeeb',
      },
      expect: {
        error: 1400,
        message: 'key not exist',
      },
    },
  });

  testEndpoint('/api/v1/events/check', {
    description: 'Return error for correct key but not logged user',
    method: 'POST',
    expectedStatus: 401,
    body: {
      send: {
        eventKey: 'hd5b',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/check', {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
