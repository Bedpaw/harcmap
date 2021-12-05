import { AppEvent } from 'src/structures/app-event';
import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getEvent: (eventId) => `events/${eventId}`,
  addEvent: (eventId) => `events/${eventId}`,
  updateEvent: (eventId) => `events/${eventId}`,
  checkEvent: 'events/check',
  joinEvent: 'events/join',
};

export const eventController = {
  getEventById ({ eventId }) {
    return httpService.get({
      url: urls.getEvent(eventId),
      responseConfig: {
        successCallback: data => new AppEvent(data),
        errorConfig: {
          ...API_ERRORS.getEventById,
        },
      },
    });
  },
  updateEvent (event) {
    return httpService.put({
      url: urls.updateEvent(event.eventId),
      body: Mapper.mapEventOut(event),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.updateEvent,
        },
      },
    });
  },
  checkEvent ({ eventKey }) {
    return httpService.post({
      url: urls.checkEvent(eventKey),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.updateEvent,
        },
      },
    });
  },
  joinEvent ({ userId, eventId, teamName }) {
    return httpService.post({
      url: urls.joinEvent,
      body: {
        userId,
        eventId,
        teamName,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.updateEvent,
        },
      },
    });
  },
  addEvent (event) {
    return httpService.post({
      url: urls.addEvent(event),
      body: Mapper.mapEventOut(event),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.addEvent,
        },
      },
    });
  },
};
