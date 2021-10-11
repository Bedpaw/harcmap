const http = require('http');
const supertest = require('supertest');
const server = require('../../server');

/**
 * @description Method for authorize user in app before test
 * @param credentials {object} - data of user to auth
 * @return {Promise<unknown>}
 */
function authUser (credentials) {
  const postData = JSON.stringify(credentials);

  return new Promise((resolve) => {
    const postRequest = http.request({
      hostname: 'localhost',
      port: '3030',
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

/**
 * @description Helper for REST API testing
 * @param endpoint {string} - path of endpoint to test
 * @param config {{
 *   description: string,
 *   method: string,
 *   body: object|array,
 *   [signIn]: object
 * }}
 */
function testEndpoint (endpoint, config) {
  const {
    description,
    method,
    expectedStatus,
    body,
    signIn,
  } = config;
  const methodsListRaw = Array.isArray(method) ? method : [method];
  const methodsList = methodsListRaw.map(eachMethod => eachMethod.toLowerCase());
  const testsList = Array.isArray(body) ? body : [body];

  /**
   * @description Function that
   * @param body {object} - object with given and expected body
   * @param testMethod {string} - http method
   */
  const oneTest = (body, testMethod) => test(description, async () => {
    const expectedContentType = 'application/json; charset=utf-8';

    const resource = supertest(server)[testMethod](endpoint);

    if (signIn) {
      const cookie = await authUser(signIn);
      resource.set('Cookie', cookie);
    }

    const {
      send: sendBody,
      expect: expectedBody,
    } = body;
    const response = await resource.send(sendBody);
    const {
      res: {
        headers,
        text,
      },
      status: responseStatus,
    } = response;
    const responseContentType = headers['content-type'];
    const responseBody = JSON.parse(text);

    expect(responseContentType).toBe(expectedContentType);
    expect(responseBody).toEqual(expectedBody);
    expect(responseStatus).toBe(expectedStatus);
  });

  testsList.forEach(testBody => {
    methodsList.forEach(testMethod => {
      oneTest(testBody, testMethod);
    });
  });
}

module.exports = testEndpoint;
