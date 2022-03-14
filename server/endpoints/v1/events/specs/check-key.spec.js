const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/check', () => {
  testEndpoint('/api/v1/events/check', {
    description: 'Return information for K3y4 event key',
    method: 'POST',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        userId: '100000000000000000000001',
        eventKey: 'K3y6',
      },
      expect: {
        eventId: '300000000000000000000002',
        eventName: 'Wydarzenie 2',
        eventDuration: {
          endDate: 2537560799000,
          startDate: 1577870639000,
        },
        role: 'admin',
        teamId: null,
        teamName: null,
        teamColor: null,
      },
    },
  });

  testEndpoint('/api/v1/events/check', {
    description: 'Return error for none exist key',
    method: 'POST',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        userId: '100000000000000000000001',
        eventKey: 'abcd',
      },
      expect: {
        error: 1401,
        message: 'key or user not exist',
        errorDetails: {
          key: 'not exist',
          user: 'exist',
        },
      },
    },
  });

  testEndpoint('/api/v1/events/check', {
    description: 'Return error for correct key but not logged user',
    method: 'POST',
    expectedStatus: 401,
    body: {
      send: {
        userId: '100000000000000000000001',
        eventKey: 'K3y1',
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
