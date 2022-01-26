import { API_ERRORS } from 'src/utils/macros/errors';
import { httpService } from 'config/http-service';
import { Mapper } from 'models/utils/mapper';
import { EventDTO } from 'models/dtos/event';
import { Event } from 'models/event';

const urls = {
  getEvent: (eventId: string) => `/events/${eventId}`,
  addEvent: (eventId: string) => `/events/${eventId}`,
  updateEvent: (eventId: string) => `/events/${eventId}`,
  checkEvent: '/events/check',
  joinEvent: '/events/join',
};

export const eventController = {
  getEventById (eventId: string) {
    return httpService.get<EventDTO, Event>({
      url: urls.getEvent(eventId),
      successCallback: data => {
        // TODO
        const e = Mapper.mapEventIn(data);
        e.eventStartDate = Number(new Date()) - 2000;
        e.eventEndDate = Number(new Date()) + 1000000000;
        if (e.mapRefreshTime < 60) {
          e.mapRefreshTime *= 60;
        }
        return e;
      },
      errorOptions: API_ERRORS.getEventById,
    });
  },
  updateEvent (event: Event) {
    return httpService.put({
      url: urls.updateEvent(event.eventId),
      body: Mapper.mapEventOut(event),
      errorOptions: API_ERRORS.updateEvent,
    });
  },
  checkEvent (eventKey: string) {
    return httpService.post({
      url: urls.checkEvent,
      body: {
        eventKey,
      },
      errorOptions: API_ERRORS.updateEvent,
    });
  },
  joinEvent (userId: string, eventId: string, teamName: string) {
    return httpService.post({
      url: urls.joinEvent,
      body: {
        userId,
        eventId,
        teamName,
      },
      errorOptions: API_ERRORS.updateEvent,
    });
  },
  addEvent (event: Event) {
    return httpService.post({
      url: urls.addEvent(event.eventId),
      body: Mapper.mapEventOut(event),
      errorOptions: API_ERRORS.addEvent,
    });
  },
};
