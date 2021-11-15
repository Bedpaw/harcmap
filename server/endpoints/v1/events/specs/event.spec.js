const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/605920002c60e426288b8971', () => {
  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Return data for event 605920002c60e426288b8971',
    method: 'GET',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    body: {
      expect: {
        eventName: 'event2',
        eventDuration: {
          startDate: 1,
          endDate: 1,
        },
        mapProperties: {
          latitude: 1,
          longitude: 1,
          zoom: 10,
        },
        eventRefreshTime: 1,
        inviteKeys: [{
          key: 'hd5b',
          keyId: '60758ddf32eed00e1a283911',
          role: 'teamMember',
        }, {
          key: 'ggy5',
          keyId: '60758ddf32eed00e1a283990',
          role: 'teamMember',
        }],
      },
    },
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Dont return data for event 605920002c60e426288b8971 if logged user have no permission',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Dont return data if user is not authenticated',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Should update data for event 605920002c60e426288b8971',
    method: 'PUT',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    body: {
      send: {
        eventName: 'event_2',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'events',
      query: { _id: ObjectId('605920002c60e426288b8971') },
      document: {
        _id: expect.any(Object),
        eventName: 'event_2',
        eventDuration: {
          startDate: 1,
          endDate: 1,
        },
        mapProperties: {
          latitude: 1,
          longitude: 1,
          zoom: 10,
        },
        eventRefreshTime: 1,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Should update nested data for event 605920002c60e426288b8971',
    method: 'PUT',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    body: {
      send: {
        eventDuration: {
          endDate: 2,
        },
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'events',
      query: { _id: ObjectId('605920002c60e426288b8971') },
      document: {
        _id: expect.any(Object),
        eventName: 'event2',
        eventDuration: {
          startDate: 1,
          endDate: 2,
        },
        mapProperties: {
          latitude: 1,
          longitude: 1,
          zoom: 10,
        },
        eventRefreshTime: 1,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Must have permission to edit event data',
    method: 'PUT',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: {
      collectionName: 'events',
      query: { _id: ObjectId('605920002c60e426288b8971') },
      document: {
        _id: expect.any(Object),
        eventName: 'event2',
        eventDuration: {
          startDate: 1,
          endDate: 1,
        },
        mapProperties: {
          latitude: 1,
          longitude: 1,
          zoom: 10,
        },
        eventRefreshTime: 1,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971', {
    description: 'Should return 500 status for others http methods',
    method: ['POST', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
