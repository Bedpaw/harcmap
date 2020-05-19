const validator = require('../lib/validator');
const utils = require('../lib/utils');

class Endpoint {

  makeThrow (validationCode) {
    const error = new Error();
    error.name = 'ValidationError';
    error.validationCode = validationCode;
    throw error;
  }

  makeThrowIf (condition, validationCode) {
    if (condition) {
      this.makeThrow(validationCode);
    }
  }

  makeCatch (error) {
    if (error.name === 'MongoError') {
      utils.responseDatabaseError(
        this.response,
        this.responseObject,
        error,
      );
    }
    if (error.name === 'ValidationError') {
      this.responseObject.error = error.validationCode;
      this.sendResponse();
    }
  }

  sendResponse (code = 200, object = this.responseObject) {
    this.response.status(code).send(object);
  }

  isAuthenticated () {
    return this.request.isAuthenticated();
  }

  /**
   * @details Method for child classes to service.
   * All of things that should be done will be there.
   * @returns {Promise<void>}
   */

  endpointService () {
    throw new Error('Method `endpointService` is not implemented');
  }

  /**
   * @details Method to define JSON data from request.
   * For HTTP GET method should be return `this.request.query`.
   * @returns {object}
   */

  getRequestJson () {
    return this.request.body;
  }

  /**
   * @details Method prepare everything and call `endpointService`.
   * Validate request and catch errors and service that.
   */

  service () {
    this.responseObject.error =
      validator.validate(
        this.validateMethod,
        this.getRequestJson());

    if (this.responseObject.error) {
      this.sendResponse();
      return;
    }

    this.endpointService()
      .catch(error => this.makeCatch(error));
  }

  /**
   * @details Save parameters and call service method.
   * Session data are saved in `this.session` field.
   * @param request - client request object
   * @param response - client response object
   * @param validateMethod - methods from `lib/validator.methods`
   */

  constructor (request, response, validateMethod) {
    this.request = request;
    this.response = response;
    this.validateMethod = validateMethod;
    this.responseObject = {};
    this.session = {};

    if (this.isAuthenticated()) {
      this.session = request.user;
    }

    this.service();
  }

}

module.exports = Endpoint;
