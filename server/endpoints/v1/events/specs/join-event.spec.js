const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/join', () => {
  testEndpoint('/api/v1/events/join', {
    description: 'Should add user to event',
    method: 'POST',
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    body: {
      send: {
        eventKey: 'ggy5',
        userId: '6074ab410b6c6887ac32adbb',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: [{
      collectionName: 'users',
      query: { _id: ObjectId('6074ab410b6c6887ac32adbb') },
      document: {
        '_id': ObjectId('6074ab410b6c6887ac32adbb'),
        'email': 'quest@google.com',
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
        'accountCreated': 0,
        'userEvents': [ObjectId('605720002c60e426288b896f'), expect.any(Object)],
      },
    }, {
      collectionName: 'usersEvents',
      query: { role: 'teamMember', teamId: ObjectId('60e6b02e0b6c6887accf6c03') },
      document: {
        '_id': expect.any(Object),
        'eventId': ObjectId('605920002c60e426288b8971'),
        'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
        'role': 'teamMember',
        'isBanned': false,
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6b02e0b6c6887accf6c03') },
      document: {
        '_id': ObjectId('60e6b02e0b6c6887accf6c03'),
        'eventId': ObjectId('605920002c60e426288b8971'),
        'teamName': 'team2',
        'teamColor': '#2d8d9d',
        'collectedPoints': [],
      },
    }, {
      collectionName: 'keys',
      query: { _id: ObjectId('60758ddf32eed00e1a283990') },
      document: {
        '_id': ObjectId('60758ddf32eed00e1a283990'),
        'key': 'ggy5',
        'role': 'teamMember',
        'eventId': ObjectId('605920002c60e426288b8971'),
        'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/join', {
    description: 'Cannot join to event if user already participle in',
    method: 'POST',
    expectedStatus: 400,
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    body: {
      send: {
        eventKey: 'te12',
        userId: '6074ab410b6c6887ac32adbb',
      },
      expect: {
        error: 1402,
        message: 'user already participle in this event',
        errorDetails: {
          role: 'teamMember',
          teamName: 'team1',
        },
      },
    },
    expectInDb: {
      collectionName: 'users',
      query: { _id: ObjectId('6074ab410b6c6887ac32adbb') },
      document: {
        '_id': ObjectId('6074ab410b6c6887ac32adbb'),
        'email': 'quest@google.com',
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
        'accountCreated': 0,
        'userEvents': [ObjectId('605720002c60e426288b896f')],
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/join', {
    description: 'Cannot join to event if userId dont belong to logged user',
    method: 'POST',
    expectedStatus: 400,
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    body: {
      send: {
        eventKey: 'te12',
        userId: '507f1f77bcf86cd799439011',
      },
      expect: {
        error: 1404,
        message: 'this user id doesnt belong to you',
      },
    },
    expectInDb: [{
      collectionName: 'users',
      query: { _id: ObjectId('6074ab410b6c6887ac32adbb') },
      document: {
        '_id': ObjectId('6074ab410b6c6887ac32adbb'),
        'email': 'quest@google.com',
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
        'accountCreated': 0,
        'userEvents': [ObjectId('605720002c60e426288b896f')],
      },
    }, {
      collectionName: 'users',
      query: { _id: ObjectId('507f1f77bcf86cd799439011') },
      document: {
        '_id': ObjectId('507f1f77bcf86cd799439011'),
        'email': 'example@domain.com',
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
        'accountCreated': 0,
        'userEvents': [ObjectId('507f191e810c19729de860ea'), ObjectId('605920002c60e426288b896f')],
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
