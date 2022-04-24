const path = require('path');
const supertest = require('supertest');

require('dotenv').config({ path: path.join(__dirname, '../../.env.tests') });

const authUser = require('./auth-user');
const database = require('../../bin/mongodb/utils');
const app = require('../../app');

/**
 * @description Helper for REST API testing
 * @param endpoint {string} - path of endpoint to test
 * @param config {{
 *   description: string,
 *   method: string,
 *   body: object|array,
 *   [signIn]: object,
 *   [insertToDatabase]: object|array,
 *   [resetDbToDefault]: boolean,
 * }}
 */
function testEndpoint (endpoint, config) {
  const {
    description,
    method,
    expectedStatus = 200,
    body = {},
    signIn,
    insertToDatabase,
    resetDbToDefault,
    expectInDb,
  } = config;
  const methodsListRaw = Array.isArray(method) ? method : [method];
  const methodsList = methodsListRaw.map(eachMethod => eachMethod.toLowerCase());
  const testsList = Array.isArray(body) ? body : [body];
  const insertToDatabaseList = Array.isArray(insertToDatabase) ? insertToDatabase : [insertToDatabase];
  const insertToDatabaseListLength = insertToDatabaseList.length;
  const expectInDbList = Array.isArray(expectInDb) ? expectInDb : [expectInDb];
  const expectInDbListLength = expectInDbList.length;

  if (resetDbToDefault || insertToDatabase) {
    afterEach(async () => {
      await database.clearToDefault();
    });
  }

  /**
   * @description Function that
   * @param body {object} - object with given and expected body
   * @param testMethod {string} - http method
   */
  const oneTest = (body, testMethod) => test(`${description} - ${testMethod}.\n      Send: ${JSON.stringify(body.send)}`, async () => {
    const server = supertest(app);
    const resource = server[testMethod](endpoint);
    const serverAddress = resource.app.address();
    const { port } = serverAddress;

    // insert to db for test
    if (insertToDatabase) {
      for (let i = 0; i < insertToDatabaseListLength; i += 1) {
        const dateToInsert = insertToDatabaseList[i];

        await database.add(dateToInsert);
      }
    }

    // authorize user
    if (signIn) {
      const cookie = await authUser(signIn, port);
      resource.set('Cookie', cookie);
    }

    const {
      send: sendBody,
      expect: expectedBody,
    } = body;
    // send request
    const response = await resource.send(sendBody || {});
    const {
      res: {
        headers,
        text,
      },
      status: responseStatus,
    } = response;
    const responseContentType = headers['content-type'];
    let responseBody;
    try {
      responseBody = JSON.parse(text);
    } catch (error) {
      responseBody = text;
    }

    const expectedContentType = 'application/json; charset=utf-8';

    // assertions
    expect(responseBody).toEqual(expectedBody);
    expect(responseStatus).toBe(expectedStatus);
    expect(responseContentType).toBe(expectedContentType);

    // check in db if necessary
    if (expectInDb) {
      for (let i = 0; i < expectInDbListLength; i += 1) {
        const expectData = expectInDbList[i];
        const {
          collectionName,
          query,
          document,
        } = expectData;

        const result = await database.find(collectionName, query);

        expect(result).toEqual(document);
      }
    }

  });

  // iterate through multiple methods and body tests
  testsList.forEach(testBody => {
    methodsList.forEach(testMethod => {
      oneTest(testBody, testMethod);
    });
  });
}

module.exports = testEndpoint;
