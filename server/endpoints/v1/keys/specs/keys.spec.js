const testEndpoint = require('../../../../tests/utils/test-endpoint');
const endpoint = '/api/v1/events/300000000000000000000001/keys/500000000000000000000001/refresh';
const { ObjectId } = require('mongodb');

describe(endpoint, () => {
  testEndpoint(endpoint, {
    description: 'Return information about application (frontend, backend)',
    method: 'POST',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {},
      expect: {
        key: expect.not.stringMatching('K3y1'),
        role: 'admin',
        eventId: '300000000000000000000001',
        eventName: 'Wydarzenie 1',
        eventDuration: {
          startDate: 1577870639000,
          endDate: 2537560799000,
        },
        teamId: null,
        teamName: null,
        teamColor: null,
      },
    },
    expectInDb: {
      collectionName: 'keys',
      query: { _id: ObjectId('500000000000000000000001') },
      document: {
        _id: ObjectId('500000000000000000000001'),
        key: expect.not.stringMatching('K3y1'),
        role: 'admin',
        eventId: ObjectId('300000000000000000000001'),
        teamId: null,
      },
    },
    resetDbToDefault: true,
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
