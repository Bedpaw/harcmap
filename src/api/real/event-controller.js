import { makeRequest, request } from 'utils/request';
import { AppEvent } from 'src/structures/app-event';
import { API_ERRORS } from 'utils/macros/errors';
import { MapPoint } from 'src/structures/map-point';
import { httpService } from 'src/config/http-service';

export const eventController = {
  getEventById ({ eventId }) {
    return makeRequest({
      method: request.get,
      url: '/event',
      data: { eventId },
      transformResponseData: data => new AppEvent(data),
      ...API_ERRORS.getEventById,
    });
  },
  getPointsByEventId ({ eventId }) {
    return makeRequest({
      method: request.get,
      url: '/event/points',
      data: { eventId },
      transformResponseData: data => {
        return data.points.map(point => new MapPoint(point));
      },
      ...API_ERRORS.getPointsByEventId,
    });
  },
  getCategoriesByEventId ({ eventId }) {
    return makeRequest({
      method: request.get,
      url: '/event/point/categories',
      data: { eventId },
      transformResponseData: data => data.categories,
      ...API_ERRORS.getCategoriesByEventId,
    });
  },
  collectPoint ({ user, eventId, pointId }) {
    return httpService.put({
      url: '/event/point/collect',
      body: {
        user,
        eventId,
        pointId,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.collectPoint,
        },
      },
    });
  },
  removePoint ({ eventId, pointId }) {
    return makeRequest({
      method: request.delete,
      url: '/event/point',
      data: { eventId, pointId },
      ...API_ERRORS.removePoint,
    });
  },
  addPoint ({ point, eventId }) {
    return makeRequest({
      method: request.post,
      url: '/event/point',
      data: {
        point,
        eventId,
      },
      ...API_ERRORS.addPoint,
    });
  },
  editPoint ({ point, eventId }) {
    return httpService.put({
      url: '/event/point',
      body: {
        point,
        eventId,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.editPoint,
        },
      },
    });
  },
  updateEvent ({
    eventId,
    eventName,
    eventStartDate,
    eventEndDate,
    mapLongitude,
    mapLatitude,
    mapZoom,
    mapRefreshTime,
  }) {
    return makeRequest({
      method: request.put,
      url: '/event',
      data: {
        eventId,
        eventName,
        eventStartDate,
        eventEndDate,
        mapLongitude,
        mapLatitude,
        mapZoom,
        mapRefreshTime,
      },
      ...API_ERRORS.updateEvent,
    });

  },
};
