const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/collect', () => {
  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/collect', {
    description: 'Collect point from event 60e6cc2eaa95cc33d7c46701',
    method: 'POST',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    body: {
      send: {
        pointKey: 'ab12',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('60e6d13faa95cc33d7c4671b') },
      document: {
        _id: ObjectId('60e6d13faa95cc33d7c4671b'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        pointCategoryId: ObjectId('60e7046eaa95cc33d7c4672b'),
        pointCollectedDate: expect.any(Number),
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6ca2aaa95cc33d7c466f8') },
      document: {
        _id: ObjectId('60e6ca2aaa95cc33d7c466f8'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        teamName: 'team1',
        collectedPoints: [ObjectId('60e6d13faa95cc33d7c4671b')],
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6b02e0b6c6887accf6c03') },
      document: {
        _id: ObjectId('60e6b02e0b6c6887accf6c03'),
        eventId: ObjectId('605920002c60e426288b8971'),
        teamName: 'team2',
        collectedPoints: [],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/collect', {
    description: 'Shouldn\'t collect point if user have no permissions',
    method: 'POST',
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointKey: 'ab12',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('60e6d13faa95cc33d7c4671b') },
      document: {
        _id: ObjectId('60e6d13faa95cc33d7c4671b'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        pointCategoryId: ObjectId('60e7046eaa95cc33d7c4672b'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6ca2aaa95cc33d7c466f8') },
      document: {
        _id: ObjectId('60e6ca2aaa95cc33d7c466f8'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        teamName: 'team1',
        collectedPoints: [],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/collect', {
    description: 'Shouldn\'t collect point if user have no permissions to event',
    method: 'POST',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointKey: 'ab12',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('60e6d13faa95cc33d7c4671b') },
      document: {
        _id: ObjectId('60e6d13faa95cc33d7c4671b'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        pointCategoryId: ObjectId('60e7046eaa95cc33d7c4672b'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6ca2aaa95cc33d7c466f8') },
      document: {
        _id: ObjectId('60e6ca2aaa95cc33d7c466f8'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        teamName: 'team1',
        collectedPoints: [],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/collect', {
    description: 'Return error for incorrect input data',
    method: 'POST',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        pointKey: 'ab1w2',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"pointKey" length must be 4 characters long'],
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('60e6d13faa95cc33d7c4671b') },
      document: {
        _id: ObjectId('60e6d13faa95cc33d7c4671b'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        pointCategoryId: ObjectId('60e7046eaa95cc33d7c4672b'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6ca2aaa95cc33d7c466f8') },
      document: {
        _id: ObjectId('60e6ca2aaa95cc33d7c466f8'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        teamName: 'team1',
        collectedPoints: [],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971/points/collect', {
    description: 'Cannot collect already collected point',
    method: 'POST',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        pointKey: 'ab1w2',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"pointKey" length must be 4 characters long'],
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('60e6d13faa95cc33d7c4671b') },
      document: {
        _id: ObjectId('60e6d13faa95cc33d7c4671b'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        pointCategoryId: ObjectId('60e7046eaa95cc33d7c4672b'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('60e6ca2aaa95cc33d7c466f8') },
      document: {
        _id: ObjectId('60e6ca2aaa95cc33d7c466f8'),
        eventId: ObjectId('60e6cc2eaa95cc33d7c46701'),
        teamName: 'team1',
        collectedPoints: [],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/collect', {
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
