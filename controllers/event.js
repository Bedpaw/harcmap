const express = require('express');
const router = express.Router();
const validator = require('../lib/validator');
const database = require('../lib/mongodb');
const utils = require('../lib/utils');

router.get('/', (request, response) => {
  const json = request.query;
  const error = validator.validate(
    validator.methods.validateEventGetRequest, json);

  let responseObject = {
    eventId: json.eventId ? json.eventId : null,
    error: error,
  };

  if (error) {
    response.send(responseObject);
    return;
  }

  database.read('events', { eventId: json.eventId })
    .then(result => {
      if (result === null) {
        utils.responseDatabaseNoData(response, responseObject);
        return;
      }
      responseObject = Object.assign(responseObject, result);
      delete responseObject._id;
      response.send(responseObject);
    })
    .catch(error => {
      utils.responseDatabaseError(response, responseObject, error);
    });
});

router.post('/', (request, response) => {
  const json = request.body;
  const error = validator.validate(
    validator.methods.validateEventPostRequest, json);

  const responseObject = {
    eventId: json.eventId ? json.eventId : null,
    error: error,
  };

  if (error) {
    response.send(responseObject);
    return;
  }

  const toSave = {
    eventId: json.eventId,
    eventName: json.eventName,
    mapLongitude: json.mapLongitude,
    mapLatitude: json.mapLatitude,
    mapZoom: json.mapZoom,
  };

  database.create('events', [toSave])
    .then(() => {
      response.send(responseObject);
    })
    .catch(error => {
      utils.responseDatabaseError(response, responseObject, error);
    });
});

router.put('/', (request, response) => {
  const json = request.body;
  const error = validator.validate(
    validator.methods.validateEventPutRequest, json);

  const responseObject = {
    eventId: json.eventId ? json.eventId : null,
    error: error,
  };

  if (error) {
    response.send(responseObject);
    return;
  }

  const filter = {
    eventId: json.eventId,
  };

  const toUpdate = {
    eventId: json.eventId,
    eventName: json.eventName,
    mapLongitude: json.mapLongitude,
    mapLatitude: json.mapLatitude,
    mapZoom: json.mapZoom,
  };

  database.update('events', filter, { $set: toUpdate })
    .then(() => {
      response.send(responseObject);
    })
    .catch(error => {
      utils.responseDatabaseError(response, responseObject, error);
    });
});

module.exports = router;
