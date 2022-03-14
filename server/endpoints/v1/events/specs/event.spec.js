const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/300000000000000000000001', () => {
  testEndpoint('/api/v1/events/300000000000000000000001', {
    description: 'Return data for event 300000000000000000000001',
    method: 'GET',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      expect: {
        eventName: 'Wydarzenie 1',
        eventRefreshTime: 60,
        eventDuration: {
          startDate: 1577870639000,
          endDate: 2537560799000,
        },
        mapProperties: {
          zoom: 10,
          longitude: 18.54,
          latitude: 54.47,
        },
        inviteKeys: [{
          key: 'K3y1',
          keyId: '500000000000000000000001',
          role: 'admin',
          teamId: null,
        }, {
          key: 'K3y2',
          keyId: '500000000000000000000002',
          role: 'observer',
          teamId: null,
        }, {
          key: 'K3y3',
          keyId: '500000000000000000000003',
          role: 'teamLeader',
          teamId: null,
        }, {
          key: 'K3y4',
          keyId: '500000000000000000000004',
          role: 'teamMember',
          teamId: '400000000000000000000001',
        }, {
          key: 'K3y5',
          keyId: '500000000000000000000005',
          role: 'teamMember',
          teamId: '400000000000000000000002',
        }],
      },
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000003', {
    description: 'Dont return data for event 300000000000000000000003 if logged user have no permission',
    method: 'GET',
    signIn: {
      email: 'user4@domain.com',
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

  testEndpoint('/api/v1/events/300000000000000000000001', {
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

  // testEndpoint('/api/v1/events/605920002c60e426288b8971', {
  //   description: 'Should update data for event 605920002c60e426288b8971',
  //   method: 'PUT',
  //   signIn: {
  //     email: 'admin@harcmap.com',
  //     password: 'Password1',
  //   },
  //   body: {
  //     send: {
  //       eventName: 'event_2',
  //     },
  //     expect: {
  //       success: true,
  //     },
  //   },
  //   expectInDb: {
  //     collectionName: 'events',
  //     query: { _id: ObjectId('605920002c60e426288b8971') },
  //     document: {
  //       _id: expect.any(Object),
  //       eventName: 'event_2',
  //       eventDuration: {
  //         startDate: 1,
  //         endDate: 1,
  //       },
  //       mapProperties: {
  //         latitude: 1,
  //         longitude: 1,
  //         zoom: 10,
  //       },
  //       eventRefreshTime: 1,
  //     },
  //   },
  //   resetDbToDefault: true,
  // });
  //
  // testEndpoint('/api/v1/events/605920002c60e426288b8971', {
  //   description: 'Should update nested data for event 605920002c60e426288b8971',
  //   method: 'PUT',
  //   signIn: {
  //     email: 'admin@harcmap.com',
  //     password: 'Password1',
  //   },
  //   body: {
  //     send: {
  //       eventDuration: {
  //         endDate: 2,
  //       },
  //     },
  //     expect: {
  //       success: true,
  //     },
  //   },
  //   expectInDb: {
  //     collectionName: 'events',
  //     query: { _id: ObjectId('605920002c60e426288b8971') },
  //     document: {
  //       _id: expect.any(Object),
  //       eventName: 'event2',
  //       eventDuration: {
  //         startDate: 1,
  //         endDate: 2,
  //       },
  //       mapProperties: {
  //         latitude: 1,
  //         longitude: 1,
  //         zoom: 10,
  //       },
  //       eventRefreshTime: 1,
  //     },
  //   },
  //   resetDbToDefault: true,
  // });
  //
  // testEndpoint('/api/v1/events/605920002c60e426288b8971', {
  //   description: 'Must have permission to edit event data',
  //   method: 'PUT',
  //   expectedStatus: 401,
  //   body: {
  //     expect: {
  //       error: 1104,
  //       message: 'no permission to resource',
  //     },
  //   },
  //   expectInDb: {
  //     collectionName: 'events',
  //     query: { _id: ObjectId('605920002c60e426288b8971') },
  //     document: {
  //       _id: expect.any(Object),
  //       eventName: 'event2',
  //       eventDuration: {
  //         startDate: 1,
  //         endDate: 1,
  //       },
  //       mapProperties: {
  //         latitude: 1,
  //         longitude: 1,
  //         zoom: 10,
  //       },
  //       eventRefreshTime: 1,
  //     },
  //   },
  //   resetDbToDefault: true,
  // });

  testEndpoint('/api/v1/events/300000000000000000000001', {
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
