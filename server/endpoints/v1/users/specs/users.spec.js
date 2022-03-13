const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/users', () => {
  testEndpoint('/api/v1/users?eventId=300000000000000000000003', {
    description: 'Return users list for event 300000000000000000000003',
    signIn: {
      email: 'user7@harcmap.pl',
      password: 'Password1',
    },
    method: 'GET',
    body: {
      expect: [{
        email: 'user7@harcmap.pl',
        userEvents: [{
          nickname: 'Nick 10',
          eventId: '300000000000000000000003',
          eventName: 'Wydarzenie 3',
          eventDuration: {
            startDate: 1577870639000,
            endDate: 2537560799000,
          },
          isBanned: false,
          role: 'creator',
          teamId: null,
          teamName: null,
        }],
      }, {
        email: 'user8@harcmap.pl',
        userEvents: [{
          nickname: 'Nick 13',
          eventId: '300000000000000000000003',
          eventName: 'Wydarzenie 3',
          eventDuration: {
            startDate: 1577870639000,
            endDate: 2537560799000,
          },
          isBanned: false,
          role: 'teamLeader',
          teamId: '400000000000000000000004',
          teamName: 'Team 4',
        }],
      }],
    },
  });

  testEndpoint('/api/v1/users?eventId=36eacc2eaa91cc33d7c46701', {
    description: 'Return error for wrong event id',
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

  testEndpoint('/api/v1/users?eventId=60e6cc2eaa95cc33d7c46701', {
    description: 'Dont return data for unauthorized user',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/users?eventId=60e6cc2eaa95cc33d7c46701', {
    description: 'Dont return data for users with to low permissions',
    method: 'GET',
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
  });

  testEndpoint('/api/v1/users?eventId', {
    description: 'Return validation error for wrong eventId format',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"eventId" is not allowed to be empty',
        ],
      },
    },
  });

  testEndpoint('/api/v1/users', {
    description: 'Return validation error for no eventId',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"eventId" is required',
        ],
      },
    },
  });

  testEndpoint('/api/v1/users', {
    description: 'Should return 500 status for others http methods',
    method: ['PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
