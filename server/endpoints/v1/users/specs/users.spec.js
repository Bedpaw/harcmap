require('dotenv').config();

const request = require('supertest');
const app = require('../../../../app');
const resourcePath = '/api/v1/users';

describe(resourcePath, () => {
  // test('GET should return users object', (done) => {
  //   // when
  //   const expectedContentType = 'application/json; charset=utf-8';
  //   const expectedHttpStatus = 200;
  //   const expectedBody = [{
  //     username: 'user1',
  //     email: 'example1@domain.com',
  //     role: 'common',
  //   }];
  //   mongodb.setDocument({
  //     _id: '12345',
  //     username: 'user1',
  //     password: '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
  //     email: 'example1@domain.com',
  //     role: 'common',
  //   });
  //
  //   // then
  //   request(app)
  //     .get(resourcePath)
  //     .expect('Content-Type', expectedContentType)
  //     .expect(expectedHttpStatus, expectedBody, done);
  // });

  // test.each([
  //   // test empty body and standard errorDetails
  //   [{}, {
  //     value: {},
  //     errors: [
  //       '"username" is required',
  //       '"email" is required',
  //       '"password" is required',
  //     ],
  //   }],
  //   // username field tests
  //   // to short
  //   [{
  //     username: 'Na',
  //   }, {
  //     value: {
  //       username: 'Na',
  //     },
  //     errors: [
  //       '"username" length must be at least 3 characters long',
  //       '"email" is required',
  //       '"password" is required',
  //     ],
  //   }],
  //   // to long
  //   [{
  //     username: 'NaNaNaNaNaNaNaNaNaNaNaNaNaN',
  //   }, {
  //     value: {
  //       username: 'NaNaNaNaNaNaNaNaNaNaNaNaNaN',
  //     },
  //     errors: [
  //       '"username" length must be less than or equal to 24 characters long',
  //       '"email" is required',
  //       '"password" is required',
  //     ],
  //   }],
  //   // correct
  //   [{
  //     username: 'NameOfUser1',
  //   }, {
  //     value: {
  //       username: 'NameOfUser1',
  //     },
  //     errors: [
  //       '"email" is required',
  //       '"password" is required',
  //     ],
  //   }],
  //   // email field tests
  //   // to long
  //   [{
  //     email: 'NaNa@aNaNaNaNaNaNaNaNaNa.com',
  //   }, {
  //     value: {
  //       email: 'NaNa@aNaNaNaNaNaNaNaNaNa.com',
  //     },
  //     errors: [
  //       '"username" is required',
  //       '"email" length must be less than or equal to 24 characters long',
  //       '"password" is required',
  //     ],
  //   }],
  //   // incorrect
  //   [{
  //     email: 'exampleMail.com',
  //   }, {
  //     value: {
  //       email: 'exampleMail.com',
  //     },
  //     errors: [
  //       '"username" is required',
  //       '"email" must be a valid email',
  //       '"password" is required',
  //     ],
  //   }],
  //   // correct
  //   [{
  //     email: 'example@mail.com',
  //   }, {
  //     value: {
  //       email: 'example@mail.com',
  //     },
  //     errors: [
  //       '"username" is required',
  //       '"password" is required',
  //     ],
  //   }],
  //   [{
  //     email: 'correct@email.com',
  //   }, {
  //     value: {
  //       email: 'correct@email.com',
  //     },
  //     errors: [
  //       '"username" is required',
  //       '"password" is required',
  //     ],
  //   }],
  //   // password field tests
  //   [{
  //     password: 'Password1',
  //   }, {
  //     value: {
  //       password: 'Password1',
  //     },
  //     errors: [
  //       '"username" is required',
  //       '"email" is required',
  //     ],
  //   }],
  // ])('POST should return 400 HTTP status for incorrect data: %p with correct response: %p', (dataToSend, errorDetails, done) => {
  //   // when
  //   const expectedContentType = 'application/json; charset=utf-8';
  //   const expectedHttpStatus = 400;
  //   const expectedBody = {
  //     error: 1001,
  //     message: 'request validation error',
  //     errorDetails,
  //   };
  //
  //   // then
  //   request(app)
  //     .post(resourcePath)
  //     .send(dataToSend)
  //     .expect('Content-Type', expectedContentType)
  //     .expect(expectedHttpStatus, expectedBody, done);
  // });

  /**
   * Test all unnecessary HTTP methods
   */
  test.each([
    'PUT', 'DELETE',
  ])('%s should return http status 401 and content type: "application/json; charset=utf-8"', (upperMethod, done) => {
    const method = upperMethod.toLowerCase();
    // when
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 401;
    const expectedBody = { error: 1104, message: 'no permission to resource' };

    // then
    request(app)[method](resourcePath)
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  test.each([
    'OPTIONS', 'PATCH', 'TRACE',
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
