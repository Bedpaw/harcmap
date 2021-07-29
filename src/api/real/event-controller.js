import { AppEvent } from 'src/structures/app-event';
import { API_ERRORS } from 'utils/macros/errors';
import { MapPoint } from 'src/structures/map-point';
import { httpService } from 'src/config/http-service';

export const eventController = {
  getEventById ({ eventId }) {
    return httpService.get({
      url: '/event',
      queryParamsObject: { eventId },
      responseConfig: {
        successCallback: data => new AppEvent(data),
        errorConfig: {
          ...API_ERRORS.getEventById,
        },
      },
    });
  },
  getPointsByEventId ({ eventId }) {
    return httpService.get({
      url: '/event/points',
      queryParamsObject: { eventId },
      responseConfig: {
        successCallback: data => data.points.map(point => new MapPoint(point)),
        errorConfig: {
          ...API_ERRORS.getPointsByEventId,
        },
      },
    });
  },
  getCategoriesByEventId ({ eventId }) {
    return httpService.get({
      url: '/event/point/categories',
      queryParamsObject: { eventId },
      responseConfig: {
        successCallback: data => data.categories,
        errorConfig: {
          ...API_ERRORS.getCategoriesByEventId,
        },
      },
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
    return httpService.delete({
      url: '/event/point',
      body: {
        pointId,
        eventId,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.removePoint,
        },
      },
    });
  },
  addPoint ({ point, eventId }) {
    return httpService.post({
      url: '/event/point',
      body: {
        point,
        eventId,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.addPoint,
        },
      },
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
    return httpService.put({
      url: '/event',
      body: {
        eventId,
        eventName,
        eventStartDate,
        eventEndDate,
        mapLongitude,
        mapLatitude,
        mapZoom,
        mapRefreshTime,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.updateEvent,
        },
      },
    });
  },
};
