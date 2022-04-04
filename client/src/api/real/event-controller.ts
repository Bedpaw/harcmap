import { API_ERRORS } from 'src/utils/macros/errors';
import { httpService } from 'config/http-service';
import { Mapper } from 'models/utils/mapper';
import { EventDTO, JoinEventParams } from 'models/dtos/event';
import { Event } from 'models/event';

const urls = {
  getEvent: (eventId: string) => `/events/${eventId}`,
  addEvent: '/events',
  updateEvent: (eventId: string) => `/events/${eventId}`,
  checkEvent: '/events/check',
  joinEvent: '/events/join',
};

export const eventController = {
  getEventById (eventId: string) {
    return httpService.get<EventDTO, Event>({
      url: urls.getEvent(eventId),
      successCallback: data => Mapper.mapEventIn(data),
      errorOptions: API_ERRORS.getEventById,
    });
  },
  updateEvent (event: Event) {
    return httpService.put({
      url: urls.updateEvent(event.eventId),
      body: { ...Mapper.mapEventOut(event), eventSettings: [] },
      errorOptions: API_ERRORS.updateEvent,
    });
  },
  checkEvent (eventKey: string, userId: string) {
    return httpService.post({
      url: urls.checkEvent,
      body: {
        eventKey,
        userId,
      },
      errorOptions: API_ERRORS.checkEvent,
    });
  },
  joinEvent (params: JoinEventParams) {
    let body;
    const { userId, eventKey, nickname, teamColor, teamName } = params;
    if (teamName || teamColor) {
      // TODO v2.1
      body = { ...params, teamColor: '#555555' };
    } else {
      body = { userId, eventKey, nickname };
    }
    return httpService.post({
      url: urls.joinEvent,
      body,
      errorOptions: API_ERRORS.joinEvent,
    });
  },
  addEvent (event: Event, userId: string) {
    return httpService.post<EventDTO, Event>({
      url: urls.addEvent,
      // TODO Add admin nickname to event form
      body: { ...Mapper.mapEventOut(event), nickname: 'Creator nickname', userId, eventSettings: [] },
      errorOptions: API_ERRORS.addEvent,
    });
  },
};
