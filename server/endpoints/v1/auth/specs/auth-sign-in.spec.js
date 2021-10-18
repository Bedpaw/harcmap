const testEndpoint = require('../../../../tests/utils/test-endpoint');
const endpoint = '/api/v1/auth/sign-in';

describe(endpoint, () => {
  testEndpoint(endpoint, {
    description: 'Should login user',
    method: 'POST',
    body: {
      send: {
        password: 'Password1',
        email: 'example@domain.com',
      },
      expect: {
        email: 'example@domain.com',
        userEvents: [
          {
            eventId: '507f191e810c19729de860ea',
            eventName: 'event1',
            teamId: '60e6ca2aaa95cc33d7c466f8',
            teamName: 'team1',
            role: 'creator',
            isBanned: false,
          },
          {
            eventId: '605920002c60e426288b896f',
            eventName: 'event2',
            teamId: '60e6b02e0b6c6887accf6c03',
            teamName: 'team2',
            role: 'teamLeader',
            isBanned: false,
          },
        ],
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'User is already logged - return his data',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'POST',
    body: {
      send: {},
      expect: {
        email: 'example@domain.com',
        userEvents: [
          {
            eventId: '507f191e810c19729de860ea',
            eventName: 'event1',
            teamId: '60e6ca2aaa95cc33d7c466f8',
            teamName: 'team1',
            role: 'creator',
            isBanned: false,
          },
          {
            eventId: '605920002c60e426288b896f',
            eventName: 'event2',
            teamId: '60e6b02e0b6c6887accf6c03',
            teamName: 'team2',
            role: 'teamLeader',
            isBanned: false,
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
    description: 'Should return 401 for invalid email and password and not authenticated user',
    method: 'POST',
    expectedStatus: 401,
    body: [{
      send: {
        email: 'example12@domain.com',
        password: 'Password1',
      },
      expect: {
        error: 1100,
        message: 'invalid credentials',
      },
    }, {
      send: {
        email: 'example1@domain.com',
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
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'POST',
    expectedStatus: 401,
    body: [{
      send: {
        email: 'example12@domain.com',
        password: 'Password1',
      },
      expect: {
        error: 1100,
        message: 'invalid credentials',
      },
    }, {
      send: {
        email: 'example1@domain.com',
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
        email: 'too_long_email_address@toolongemailaddress.com',
        password: 'Password1',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"email" length must be less than or equal to 24 characters long'],
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for invalid password field and not authenticated user',
    method: 'POST',
    expectedStatus: 400,
    body: [{
      send: {
        email: 'example@domain.com',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" is required'],
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'short',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" length must be at least 8 characters long'],
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'this_is_too_long_password',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" length must be less than or equal to 24 characters long'],
      },
    }],
  });

  testEndpoint(endpoint, {
    description: 'Should return 400 status for invalid password field and authenticated user',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'POST',
    expectedStatus: 400,
    body: [{
      send: {
        email: 'example@domain.com',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" is required'],
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'short',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" length must be at least 8 characters long'],
      },
    }, {
      send: {
        email: 'example@domain.com',
        password: 'this_is_too_long_password',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"password" length must be less than or equal to 24 characters long'],
      },
    }],
  });

  /**
   * Test all unnecessary HTTP methods
   */
  testEndpoint(endpoint, {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'],
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
