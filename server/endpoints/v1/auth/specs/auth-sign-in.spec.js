const testEndpoint = require('../../../../tests/utils/test-endpoint');
const endpoint = '/api/v1/auth/sign-in';

describe(endpoint, () => {
  testEndpoint(endpoint, {
    description: 'Should login user',
    method: 'POST',
    body: {
      send: {
        email: 'user1@harcmap.pl',
        password: 'Password1',
      },
      expect: {
        userId: '100000000000000000000001',
        email: 'user1@harcmap.pl',
        userEvents: [
          {
            eventId: '300000000000000000000001',
            eventName: 'Wydarzenie 1',
            eventDuration: {
              endDate: 2537560799000,
              startDate: 1577870639000,
            },
            teamId: null,
            teamName: null,
            role: 'creator',
            isBanned: false,
            nickname: 'Nick 1',
          },
        ],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'User is already logged - return his data',
    signIn: {
      email: 'user4@harcmap.pl',
      password: 'Password1',
    },
    method: 'POST',
    body: {
      send: {},
      expect: {
        userId: '100000000000000000000004',
        email: 'user4@harcmap.pl',
        userEvents: [
          {
            eventId: '300000000000000000000001',
            eventName: 'Wydarzenie 1',
            eventDuration: {
              endDate: 2537560799000,
              startDate: 1577870639000,
            },
            teamId: '400000000000000000000001',
            teamName: 'Team 1',
            role: 'teamMember',
            isBanned: false,
            nickname: 'Nick 3',
          }, {
            eventId: '300000000000000000000002',
            eventName: 'Wydarzenie 2',
            eventDuration: {
              endDate: 2537560799000,
              startDate: 1577870639000,
            },
            teamId: null,
            teamName: null,
            role: 'creator',
            isBanned: false,
            nickname: 'Nick 4',
          },
        ],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Failed to get not logged user data',
    method: 'POST',
    expectedStatus: 401,
    body: {
      send: {},
      expect: {
        error: 1106,
        message: 'not logged',
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Return already logged user even if we try to login with new data',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    method: 'POST',
    expectedStatus: 200,
    body: {
      send: {
        email: 'user1@harcmap.pl',
        password: 'Password1',
      },
      expect: {
        userId: '100000000000000000000001',
        email: 'user1@harcmap.pl',
        userEvents: [
          {
            eventId: '300000000000000000000001',
            eventName: 'Wydarzenie 1',
            eventDuration: {
              endDate: 2537560799000,
              startDate: 1577870639000,
            },
            teamId: null,
            teamName: null,
            role: 'creator',
            isBanned: false,
            nickname: 'Nick 1',
          },
        ],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Should return 401 for invalid email and password and not authenticated user',
    method: 'POST',
    expectedStatus: 401,
    body: [{
      send: {
        email: 'user111@harcmap.pl',
        password: 'Password1',
      },
      expect: {
        error: 1100,
        message: 'invalid credentials',
      },
    }, {
      send: {
        email: 'user1@harcmap.pl',
        password: 'Password11',
      },
      expect: {
        error: 1100,
        message: 'invalid credentials',
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 401 for invalid email and password and for authenticated user',
    signIn: {
      email: 'user3@henouser.pl',
      password: 'Password1',
    },
    method: 'POST',
    expectedStatus: 401,
    body: [{
      send: {
        email: 'user111@harcmap.pl',
        password: 'Password1',
      },
      expect: {
        error: 1100,
        message: 'invalid credentials',
      },
    }, {
      send: {
        email: 'user1@harcmap.pl',
        password: 'Password11',
      },
      expect: {
        error: 1100,
        message: 'invalid credentials',
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for not empty body but wrong fields',
    method: 'POST',
    expectedStatus: 400,
    body: {
      send: {
        wrongField: 'someData',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"email" is required',
          '"password" is required',
          '"wrongField" is not allowed',
        ],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for invalid email field',
    method: 'POST',
    expectedStatus: 400,
    body: [{
      send: {
        password: 'Password1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"email" is required'],
      },
    }, {
      send: {
        email: 'invalidEmail.com',
        password: 'Password1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"email" must be a valid email'],
      },
    }, {
      send: {
        email: 'too_long_email_address_more_more_long_then_50_characters@toolongemailaddress.com',
        password: 'Password1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"email" length must be less than or equal to 50 characters long'],
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for invalid password field and not authenticated user',
    method: 'POST',
    expectedStatus: 400,
    body: [{
      send: {
        email: 'user1@harcmap.pl',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" is required'],
      },
    }, {
      send: {
        email: 'user1@harcmap.pl',
        password: 'short',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" with value "short" fails to match the required pattern: /^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/'],
      },
    }, {
      send: {
        email: 'user1@harcmap.pl',
        password: 'this_is_too_long_password',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" with value "this_is_too_long_password" fails to match the required pattern: /^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/'],
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for invalid password field and authenticated user',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    method: 'POST',
    expectedStatus: 400,
    body: [{
      send: {
        email: 'user3@harcmap.pl',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" is required'],
      },
    }, {
      send: {
        email: 'user3@harcmap.pl',
        password: 'short',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" with value "short" fails to match the required pattern: /^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/'],
      },
    }, {
      send: {
        email: 'user3@harcmap.pl',
        password: 'this_is_too_long_password',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" with value "this_is_too_long_password" fails to match the required pattern: /^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/'],
      },
    }],
  });

  /**
   * Test all unnecessary HTTP methods
   */
  testEndpoint(endpoint, {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'PUT', 'DELETE', 'TRACE'],
    expectedStatus: 500,
    body: [{
      send: {},
      expect: {
        error: 1000,
        message: 'no schema',
      },
    }, {
      send: {},
      expect: {
        error: 1000,
        message: 'no schema',
      },
    }, {
      send: {
        email: 'example@domain.com',
      },
      expect: {
        error: 1000,
        message: 'no schema',
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'Password1',
      },
      expect: {
        error: 1000,
        message: 'no schema',
      },
    }],
  });
});
