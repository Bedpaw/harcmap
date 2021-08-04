require('dotenv').config();

const request = require('supertest');
const app = require('../../app');

describe('/about', () => {
	test('GET should return http status 200 and content type: "application/json; charset=utf-8"', (done) => {
		// given
		const expectedContentType = 'application/json; charset=utf-8';
		const expectedHttpStatus = 200;
		const expectedBody = {
			name: 'boilerplate-expressjs',
			author: 'Paweł Jurkiewicz (https://gitlab.com/henouser)',
		};

		// when
		request(app)
			.get('/about')
			.expect('Content-Type', expectedContentType)
			.expect(expectedHttpStatus, expectedBody, done);
	});

	// TODO head method
	test.each([
		'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'TRACE',
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
