require('dotenv').config();

// mock server package.json
jest.mock('../../package.json', () => ({
  version: '1.2.3',
}), { virtual: true });

// mock main app package.json
jest.mock('../../../package.json', () => ({
  version: '2.3.4',
  author: 'harcmapTeam',
  name: 'harcmap',
}), { virtual: true });

// mock client package.json
jest.mock('../../../client/package.json', () => ({
  version: '3.4.5',
}), { virtual: true });

const request = require('supertest');
const app = require('../../app');

describe('/about', () => {
  test('GET should return http status 200 and content type: "application/json; charset=utf-8"', (done) => {
    // given
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 200;
    const expectedBody = {
      appName: 'harcmap',
      author: 'harcmapTeam',
      version: '2.3.4',
      appClientVersion: '3.4.5',
      appServerVersion: '1.2.3',
    };

    // when
    request(app)
      .get('/about')
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });

  test.each([
    'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH',
  ])('%s should return http status 500 and content type: "application/json; charset=utf-8"', (upperMethod, done) => {
    const method = upperMethod.toLowerCase();
    // given
    const expectedContentType = 'application/json; charset=utf-8';
    const expectedHttpStatus = 500;
    const expectedBody = { error: 1000, message: 'no schema' };

    // when
    request(app)[method]('/about')
      .expect('Content-Type', expectedContentType)
      .expect(expectedHttpStatus, expectedBody, done);
  });
});
