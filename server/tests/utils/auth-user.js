const http = require('http');

/**
 * @description Method for authorize user in app before test
 * @param credentials {object} - data of user to auth
 * @return {Promise<unknown>}
 */
function authUser (credentials, serverPort) {
	const postData = JSON.stringify(credentials);

	return new Promise((resolve) => {
		const postRequest = http.request({
			hostname: 'localhost',
			port: serverPort,
			path: '/api/v1/auth/sign-in',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData),
			},
		}, response => {
			const setCookie = response.headers['set-cookie'];
			const cookie = setCookie ? setCookie[0].split(';')[0] : 'undefined';

			if (cookie) {
				resolve(cookie);
			} else {
				console.log(`sign-in: ${cookie ? 'success' : 'failed'}`);
				console.log(cookie);
			}
		});

		postRequest.write(postData);
		postRequest.end();
	});
}

module.exports = authUser;
