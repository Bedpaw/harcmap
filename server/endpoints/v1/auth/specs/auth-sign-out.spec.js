require('dotenv').config();

const request = require('supertest');
const app = require('../../../../app');
const resourcePath = '/api/v1/auth/sign-out';

describe(resourcePath, () => {
  // test('POST should return 200 for logged user', (done) => {
  //   // when
  //   const expectedContentType = 'application/json; charset=utf-8';
  //   const expectedHttpStatus = 200;
  //   const expectedBody = {
  //     success: true,
  //   };
  //   mongodb.setDocument({
  //     _id: '12345',
  //     password: '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
  //     email: 'example1@domain.com',
  //   });
  //
  //   // then
  //   request(app)
  //     .post(resourcePath)
  //     .expect('Content-Type', expectedContentType)
  //     .expect(expectedHttpStatus, expectedBody, done);
  // });

  test('POST should return 401 for none logged user', (done) => {
    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 401;
    const expectedBody = {
      error: 1105,
      message: 'cannot logout unauthorized user',
    };

    // then
    request(app)
      .post(resourcePath)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  test('POST should return 400 HTTP status for incorrect data with correct response', (done) => {
    // given
    const dataToSend = {
      a: 'string',
    };

    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 400;
    const expectedBody = {
      error: 1001,
      message: 'request validation error',
      errorDetails: {
        value: {
          a: 'string',
        },
        errors: ['"a" is not allowed'],
      },
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
