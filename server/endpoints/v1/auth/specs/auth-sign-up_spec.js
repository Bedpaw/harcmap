require('dotenv').config();

const request = require('supertest');
const app = require('../../../../app');
const resourcePath = '/api/v1/auth/sign-up';

// describe(resourcePath, () => {
//   test('POST should create user and return success information', (done) => {
//     // given
//     const dataToSend = {
//       password: 'Password1',
//       email: 'example1@domain.com',
//     };
//
//     // when
//     const expectedContentType = 'application/json; charset=utf-8';
//     const expectedHttpStatus = 500;
//     const expectedBody = {
//       success: true,
//     };
//
//     // then
//     request(app)
//       .post(resourcePath)
//       .send(dataToSend)
//       .expect('Content-Type', expectedContentType)
//       .expect(expectedHttpStatus, expectedBody, done);
//   });
//
//   test.each([
//     // test empty body and standard errorDetails
//     [{}, {
//       value: {},
//       errors: [
//         '"email" is required',
//         '"password" is required',
//       ],
//     }],
//     // email field tests
//     // to long
//     [{
//       email: 'NaNa@aNaNaNaNaNaNaNaNaNa.com',
//     }, {
//       value: {
//         email: 'NaNa@aNaNaNaNaNaNaNaNaNa.com',
//       },
//       errors: [
//         '"email" length must be less than or equal to 24 characters long',
//         '"password" is required',
//       ],
//     }],
//     // incorrect
//     [{
//       email: 'exampleMail.com',
//     }, {
//       value: {
//         email: 'exampleMail.com',
//       },
//       errors: [
//         '"email" must be a valid email',
//         '"password" is required',
//       ],
//     }],
//     // correct
//     [{
//       email: 'example@mail.com',
//     }, {
//       value: {
//         email: 'example@mail.com',
//       },
//       errors: [
//         '"password" is required',
//       ],
//     }],
//     // password field tests
//     [{
//       password: 'Password1',
//     }, {
//       value: {
//         password: 'Password1',
//       },
//       errors: [
//         '"email" is required',
//       ],
//     }],
//   ])('POST should return 400 HTTP status for incorrect data: %p with correct response: %p', (dataToSend, errorDetails, done) => {
//     // when
//     const expectedContentType = 'application/json; charset=utf-8';
//     const expectedHttpStatus = 400;
//     const expectedBody = {
//       error: 1001,
//       message: 'request validation error',
//       errorDetails,
//     };
//
//     // then
//     request(app)
//       .post(resourcePath)
//       .send(dataToSend)
//       .expect('Content-Type', expectedContentType)
//       .expect(expectedHttpStatus, expectedBody, done);
//   });
//
//   /**
//    * Test all unnecessary HTTP methods
//    */
//   test.each([
//     'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'TRACE',
//   ])('%s should return http status 500 and content type: "application/json; charset=utf-8"', (upperMethod, done) => {
//     const method = upperMethod.toLowerCase();
//     // when
//     const expectedContentType = 'application/json; charset=utf-8';
//     const expectedHttpStatus = 500;
//     const expectedBody = { error: 1000, message: 'no schema' };
//
//     // then
//     request(app)[method](resourcePath)
//       .expect('Content-Type', expectedContentType)
//       .expect(expectedHttpStatus, expectedBody, done);
//   });
// });
