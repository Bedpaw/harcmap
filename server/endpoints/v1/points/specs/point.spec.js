const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/300000000000000000000002/points/600000000000000000000008', () => {
  testEndpoint('/api/v1/events/300000000000000000000002/points/600000000000000000000008', {
    description: 'Update data for point 600000000000000000000008',
    method: 'PUT',
    signIn: {
      email: 'user4@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        pointName: 'New point name',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000008') },
      document: {
        _id: ObjectId('600000000000000000000008'),
        eventId: ObjectId('300000000000000000000002'),
        pointCategoryId: ObjectId('700000000000000000000004'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: 'New point name',
        pointPosition: {
          latitude: 54.46,
          longitude: 18.54,
        },
        pointType: 'permanent',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000002/points/600000000000000000000008', {
    description: 'Shouldn\'t update data for point if user have no permissions',
    method: 'PUT',
    signIn: {
      email: 'user7@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointType: 'timeout',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000008') },
      document: {
        _id: ObjectId('600000000000000000000008'),
        eventId: ObjectId('300000000000000000000002'),
        pointCategoryId: ObjectId('700000000000000000000004'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: null,
        pointPosition: {
          latitude: 54.46,
          longitude: 18.54,
        },
        pointType: 'permanent',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000002/points/600000000000000000000008', {
    description: 'Shouldn\'t update data for point if user dont participle in point event',
    method: 'PUT',
    signIn: {
      email: 'user1@harcmap.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointType: 'timeout',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000008') },
      document: {
        _id: ObjectId('600000000000000000000008'),
        eventId: ObjectId('300000000000000000000002'),
        pointCategoryId: ObjectId('700000000000000000000004'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: null,
        pointPosition: {
          latitude: 54.46,
          longitude: 18.54,
        },
        pointType: 'permanent',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points/600000000000000000000001', {
    description: 'Should return error for incorrect input data',
    method: 'PUT',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        pointType: 'fef',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"pointType" must be one of [timeout, permanent]'],
      },
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points/600000000000000000000005', {
    description: 'DELETE point 600000000000000000000005',
    method: 'DELETE',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000005') },
      document: null,
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points/600000000000000000000005', {
    description: 'Shouldn\'t delete point if user have no permissions',
    method: 'DELETE',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000005') },
      document: {
        _id: ObjectId('600000000000000000000005'),
        eventId: ObjectId('300000000000000000000001'),
        pointCategoryId: ObjectId('700000000000000000000002'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: 1641571962000,
          startDate: 1610035962000,
        },
        pointName: 'Punkt 5',
        pointPosition: {
          latitude: 54.473,
          longitude: 18.548,
        },
        pointType: 'timeout',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points/600000000000000000000005', {
    description: 'Shouldn\'t delete point for unauthorized user',
    method: 'DELETE',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000005') },
      document: {
        _id: ObjectId('600000000000000000000005'),
        eventId: ObjectId('300000000000000000000001'),
        pointCategoryId: ObjectId('700000000000000000000002'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: 1641571962000,
          startDate: 1610035962000,
        },
        pointName: 'Punkt 5',
        pointPosition: {
          latitude: 54.473,
          longitude: 18.548,
        },
        pointType: 'timeout',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points/600000000000000000000005', {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
