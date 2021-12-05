import { httpService } from 'config/http-service';
import { API_ERRORS } from 'utils/macros/errors';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getPointsByEventId: (eventId) => '/events/' + eventId + '/points',
  collectPoint: (eventId) => '/events/' + eventId + '/points/collect',
  removePoint: (eventId, pointId) => '/events/' + eventId + '/points/' + pointId,
  addPoint: (eventId) => '/events/' + eventId + '/points',
  editPoint: (eventId, pointId) => '/events/' + eventId + '/points/' + pointId,
};

export const pointController = {
  getPointsByEventId ({ eventId }) {
    return httpService.get({
      url: urls.getPointsByEventId(eventId),
      responseConfig: {
        successCallback: data => data.map(point => Mapper.mapPointIn(point)),
        errorConfig: {
          ...API_ERRORS.getPointsByEventId,
        },
      },
    });
  },
  collectPoint ({ pointKey, eventId }) {
    return httpService.put({
      url: urls.collectPoint(eventId),
      body: Mapper.mapPointOut(pointKey),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.collectPoint,
        },
      },
    });
  },
  removePoint ({ eventId, pointId }) {
    return httpService.delete({
      url: urls.removePoint(eventId, pointId),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.removePoint,
        },
      },
    });
  },
  addPoint ({ point, eventId }) {
    return httpService.post({
      url: urls.addPoint(eventId),
      body: Mapper.mapPointOut(point),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.addPoint,
        },
      },
    });
  },
  editPoint ({ point, pointId, eventId }) {
    return httpService.put({
      url: urls.editPoint(eventId, pointId),
      body: Mapper.mapPointOut(point),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.editPoint,
        },
      },
    });
  },
};
