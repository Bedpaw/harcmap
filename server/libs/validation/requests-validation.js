const { errorCodes, AppError } = require('../errors');
const { requestSchemaStore } = require('./request-schema-store');
const { validateOne } = require('../utils');

/**
 * @description Middleware for expressjs validate request body and query params
 * @param app {object} - ExpressJS app instance
 */
function validateRequests (app) {
  const endpointsUrlList = Object.keys(requestSchemaStore);

  endpointsUrlList.forEach((endpointUrl) => {
    // todo logs
    app.all(endpointUrl, (request, response, next) => {
      const { method, body, query } = request;
      const endpointSchemaObject = requestSchemaStore[endpointUrl]
        ? requestSchemaStore[endpointUrl][method]
        : null;

      // schema exist
      if (endpointSchemaObject) {
        // data to validate for POST, PUT, DELETE
        let data = body;

        // data to validate for GET
        if (method === 'GET') {
          data = query;
        }
        // TODO validation body for GET and query for POST, PUT, DELETE

        const validatedData = validateOne(data, endpointSchemaObject);

        // validation error
        if (validatedData.errors.length) {
          throw new AppError(errorCodes.REQUEST_VALIDATION_ERROR, {
            httpStatus: 400,
            details: validatedData,
          });
        }
      } else {
        // no schema
        throw new AppError(errorCodes.NO_SCHEMA, {
          httpStatus: 500,
        });
      }
      next();
    });
  });
}

module.exports = validateRequests;
