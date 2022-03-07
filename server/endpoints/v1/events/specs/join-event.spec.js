const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/join', () => {
  testEndpoint('/api/v1/events/join', {
    description: 'Should add user to event',
    method: 'POST',
    signIn: {
      email: 'user9@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        userId: '100000000000000000000009',
        eventKey: 'K3y1',
      },
      expect: {
        eventDuration: {
          endDate: 2537560799000,
          startDate: 1577870639000,
        },
        eventId: '300000000000000000000001',
        eventName: 'Wydarzenie 1',
        role: 'admin',
        teamColor: null,
        teamId: null,
        teamName: null,
      },
    },
    expectInDb: [{
      collectionName: 'users',
      query: { _id: ObjectId('100000000000000000000009') },
      document: {
        '_id': ObjectId('100000000000000000000009'),
        'email': 'user9@harcmap.pl',
        // password: Password1
        'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
        'accountActivation': {
          'isActive': true,
          'key': null,
        },
        'passwordReset': {
          'key': null,
          'date': null,
        },
        'accountCreated': expect.any(Number),
        'userEvents': [expect.any(Object)],
      },
    }, {
      collectionName: 'usersEvents',
      query: { role: 'admin', eventId: ObjectId('300000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'eventId': ObjectId('300000000000000000000001'),
        'teamId': null,
        'role': 'admin',
        'isBanned': false,
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/join', {
    description: 'Cannot join to event if user already participle in',
    method: 'POST',
    expectedStatus: 400,
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        eventKey: 'K3y3',
        userId: '100000000000000000000001',
      },
      expect: {
        error: 1402,
        message: 'user already participle in this event',
        errorDetails: {
          role: 'creator',
          teamName: null,
        },
      },
    },
    expectInDb: {
      collectionName: 'users',
      query: { _id: ObjectId('100000000000000000000001') },
      document: {
        '_id': ObjectId('100000000000000000000001'),
        'email': 'user1@harcmap.pl',
        // password: Password1
        'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
        'accountActivation': {
          'isActive': true,
          'key': null,
        },
        'passwordReset': {
          'key': null,
          'date': null,
        },
        'accountCreated': expect.any(Number),
        'userEvents': [ObjectId('200000000000000000000001')],
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/join', {
    description: 'Cannot join to event if userId dont belong to logged user',
    method: 'POST',
    expectedStatus: 400,
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        eventKey: 'K3y2',
        userId: '100000000000000000000002',
      },
      expect: {
        error: 1404,
        message: 'this user id doesnt belong to you',
      },
    },
    expectInDb: [{
      collectionName: 'users',
      query: { _id: ObjectId('100000000000000000000001') },
      document: {
        '_id': ObjectId('100000000000000000000001'),
        'email': 'user1@harcmap.pl',
        // password: Password1
        'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
        'accountActivation': {
          'isActive': true,
          'key': null,
        },
        'passwordReset': {
          'key': null,
          'date': null,
        },
        'accountCreated': expect.any(Number),
        'userEvents': [ObjectId('200000000000000000000001')],
      },
    }, {
      collectionName: 'users',
      query: { _id: ObjectId('100000000000000000000002') },
      document: {
        '_id': ObjectId('100000000000000000000002'),
        'email': 'user2@harcmap.pl',
        // password: Password1
        'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
        'accountActivation': {
          'isActive': false,
          'key': 'e993b950c469ca8eb60e1e7a22027b943877ccb0bfdd30a60846f07d36830e7f657020da10e124ca09e3dccfcd7e59af74a31e08a74e8f210f69bd69c9fdaec0',
        },
        'passwordReset': {
          'key': null,
          'date': null,
        },
        'accountCreated': expect.any(Number),
        'userEvents': [],
      },
    }],
    resetDbToDefault: true,
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
