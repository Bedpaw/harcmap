require('dotenv').config();

const request = require('supertest');
const mongodb = require('../../../../libs/__mocks__/mongodb');
const app = require('../../../../app');
const resourcePath = '/api/v1/auth/sign-in';

describe(resourcePath, () => {
  test('POST should sign in user and return user data', (done) => {
    // given
    const dataToSend = {
      username: 'user1',
      password: 'Password1',
    };

    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 200;
    const expectedBody = {
      username: 'user1',
      email: 'example1@domain.com',
      role: 'common',
    };
    mongodb.setDocument({
      _id: '12345',
      username: 'user1',
      password: '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
      email: 'example1@domain.com',
      role: 'common',
    });

    // then
    request(app)
      .post(resourcePath)
      .send(dataToSend)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  test.each([
    {
      username: 'user11',
      password: 'Password1',
    }, {
      username: 'user1',
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
    mongodb.setDocument({
      _id: '12345',
      username: 'user1',
      password: '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
      email: 'example1@domain.com',
      role: 'common',
    });

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
        '"username" is required',
        '"password" is required',
      ],
    }],
    // username field tests
    // to short
    [{
      username: 'Na',
    }, {
      value: {
        username: 'Na',
      },
      errors: [
        '"username" length must be at least 3 characters long',
        '"password" is required',
      ],
    }],
    // to long
    [{
      username: 'NaNaNaNaNaNaNaNaNaNaNaNaNaN',
    }, {
      value: {
        username: 'NaNaNaNaNaNaNaNaNaNaNaNaNaN',
      },
      errors: [
        '"username" length must be less than or equal to 24 characters long',
        '"password" is required',
      ],
    }],
    // correct
    [{
      username: 'NameOfUser1',
    }, {
      value: {
        username: 'NameOfUser1',
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
        '"username" is required',
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
    mongodb.setDocument({
      _id: '12345',
      username: 'user1',
      password: '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
      email: 'example1@domain.com',
      role: 'common',
    });

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
