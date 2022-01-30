import { PointDTO, PointDTOCreate, PointDTOUpdate } from 'models/dtos/point';
import { PointType } from 'models/point';
import { EventDTO, EventDTOCreate, EventDTOUpdate } from 'models/dtos/event';
import { Event } from 'models/event';
import { UserDTO } from 'models/dtos/user';
import { User, UserInEvent } from 'models/user';

export class Mapper {

  public static mapPointIn (pointIn: PointDTO): PointType {
    return {
      pointAppearanceTime: pointIn.pointDuration.startDate,
      pointCategoryId: pointIn.pointCategoryId,
      pointCollectionTime: pointIn.pointCollectedDate,
      pointExpirationTime: pointIn.pointDuration.endDate,
      pointId: pointIn.pointId,
      pointKey: pointIn.pointKey ?? null,
      pointLatitude: pointIn.pointPosition.latitude,
      pointLongitude: pointIn.pointPosition.longitude,
      pointName: pointIn.pointName,
      pointType: pointIn.pointType,
    };
  }

  public static mapPointOut (pointOut: PointType): PointDTOCreate | PointDTOUpdate {
    return {
      pointCategoryId: pointOut.pointCategoryId,
      pointDuration: {
        startDate: pointOut.pointAppearanceTime,
        endDate: pointOut.pointExpirationTime,
      },
      pointName: pointOut.pointName,
      pointPosition: {
        longitude: pointOut.pointLongitude,
        latitude: pointOut.pointLatitude,
      },
      pointType: pointOut.pointType,
    };
  }

  public static mapEventIn (eventIn: EventDTO): Event {
    return {
      eventEndDate: eventIn.eventDuration.endDate,
      eventId: eventIn.eventId,
      eventName: eventIn.eventName,
      eventStartDate: eventIn.eventDuration.startDate,
      mapLatitude: eventIn.mapProperties.latitude,
      mapLongitude: eventIn.mapProperties.longitude,
      mapRefreshTime: eventIn.eventRefreshTime,
      mapZoom: eventIn.mapProperties.zoom,
      eventKey: eventIn.eventKey,
      inviteKeys: eventIn.inviteKeys,
    };
  }

  public static mapEventOut (eventOut: Event): EventDTOCreate | EventDTOUpdate {
    return {
      eventDuration: {
        endDate: eventOut.eventEndDate,
        startDate: eventOut.eventStartDate,
      },
      eventKey: eventOut.eventKey,
      eventName: eventOut.eventName,
      eventRefreshTime: eventOut.mapRefreshTime,
      mapProperties: {
        longitude: eventOut.mapLongitude,
        latitude: eventOut.mapLatitude,
        zoom: eventOut.mapZoom,
      },
      inviteKeys: eventOut.inviteKeys,
    };
  }

  public static mapUserIn (user: UserDTO): User {
    // TODO: to remove after correction on backend
    if (user.userEvents[0].eventId === undefined) {
      return {
        ...user,
        userEvents: [],
      };
    }

    // When user have many userEvents -> ex. signIn response
    return {
      ...user,
      userEvents: user.userEvents.map(event => ({
        ...event,
        eventEndDate: event.eventDuration.endDate,
        eventStartDate: event.eventDuration.startDate,
      })),
    };
  }

  public static mapUserInEvent (user: UserDTO): UserInEvent {
    // When user have only 1 userEvent => ex. get all users in current event
    const { userId, isActive, email } = user;
    const {
      eventId, eventName, teamName, teamId, isBanned, role,
      eventDuration: {
        endDate: eventEndDate,
        startDate: eventStartDate,
      },
    } = user.userEvents[0];

    return {
      eventEndDate,
      eventId,
      eventName,
      eventStartDate,
      isActive,
      isBanned,
      role,
      teamId,
      teamName,
      userId,
      email,
    };
  }
}
