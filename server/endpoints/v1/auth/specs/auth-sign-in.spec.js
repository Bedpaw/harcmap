require('dotenv').config();

const request = require('supertest');
const app = require('../../../../app');
const resourcePath = '/api/v1/auth/sign-in';

describe(resourcePath, () => {
  test('POST should sign in user and return user data', (done) => {
    // given
    const dataToSend = {
      email: 'example@domain.com',
      password: 'Password1',
    };

    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 200;
    const expectedBody = {
      email: 'example@domain.com',
      accountActivation: {
        isActive: true,
        key: null,
      },
      passwordReset: {
        key: null,
        date: null,
      },
      accountCreated: 0,
    };

    // then
    request(app)
      .post(resourcePath)
      .send(dataToSend)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  test.each([
    {
      email: 'example12@domain.com',
      password: 'Password1',
    }, {
      email: 'example1@domain.com',
      password: 'Password11',
    },
  ])('POST should return 401 HTTP for incorrect login data: %p', (dataToSend, done) => {
    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 401;
    const expectedBody = {
      error: 1100,
      message: 'invalid credentials',
    };

    // then
    request(app)
      .post(resourcePath)
      .send(dataToSend)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  test.each([
    // test empty body and standard errorDetails
    [{}, {
      value: {},
      errors: [
        '"email" is required',
        '"password" is required',
      ],
    }],
    // email field tests
    // to short
    [{
      email: 'Na',
    }, {
      value: {
        email: 'Na',
      },
      errors: [
        '"email" must be a valid email',
        '"password" is required',
      ],
    }],
    // to long
    [{
      email: 'Na@NaNaNaNaNaNaNaNaNaNaNaNaN.pl',
    }, {
      value: {
        email: 'Na@NaNaNaNaNaNaNaNaNaNaNaNaN.pl',
      },
      errors: [
        '"email" length must be less than or equal to 24 characters long',
        '"password" is required',
      ],
    }],
    // correct
    [{
      email: 'example1@domain.com',
    }, {
      value: {
        email: 'example1@domain.com',
      },
      errors: [
        '"password" is required',
      ],
    }],
    // password field tests
    [{
      password: 'Password1',
    }, {
      value: {
        password: 'Password1',
      },
      errors: [
        '"email" is required',
      ],
    }],
  ])('POST should return 400 HTTP status for incorrect data: %p with correct response: %p', (dataToSend, errorDetails, done) => {
    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 400;
    const expectedBody = {
      error: 1001,
      message: 'request validation error',
      errorDetails,
    };

    // then
    request(app)
      .post(resourcePath)
      .send(dataToSend)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  /**
   * Test all unnecessary HTTP methods
   */
  test.each([
    'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'TRACE',
  ])('%s should return http status 500 and content type: "application/json; charset=utf-8"', (upperMethod, done) => {
    const method = upperMethod.toLowerCase();
    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 500;
    const expectedBody = { error: 1000, message: 'no schema' };

    // then
    request(app)[method](resourcePath)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });
});
