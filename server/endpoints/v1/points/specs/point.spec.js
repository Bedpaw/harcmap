const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', () => {
  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
    description: 'Update data for point 60e6d13faa95cc33d7c4671b',
    method: 'PUT',
    signIn: {
      email: 'example@domain.com',
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
        pointName: 'New point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
    description: 'Shouldn\'t update data for point if user have no permissions',
    method: 'PUT',
    signIn: {
      email: 'quest@google.com',
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
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
    description: 'Shouldn\'t update data for point if user have dont participle in point event',
    method: 'PUT',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointType: 'permanent',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: {
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
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
    description: 'Should return error for incorrect input data',
    method: 'PUT',
    signIn: {
      email: 'example@domain.com',
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

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
    description: 'Update data for point 60e6d13faa95cc33d7c4671b',
    method: 'DELETE',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    body: {
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'points',
      query: { _id: ObjectId('60e6d13faa95cc33d7c4671b') },
      document: null,
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
    description: 'Shouldn\'t delete point if user have no permissions',
    method: 'DELETE',
    signIn: {
      email: 'quest@google.com',
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
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
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
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points/60e6d13faa95cc33d7c4671b', {
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
