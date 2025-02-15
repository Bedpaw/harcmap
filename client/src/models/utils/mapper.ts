import { PointDTO, PointDTOCreate, PointDTOUpdate } from 'models/dtos/point';
import { PointType } from 'models/point';
import { EventCheckDTO, EventCheckDTOMapped, EventDTO, EventDTOCreate, EventDTOUpdate } from 'models/dtos/event';
import { Event } from 'models/event';
import { UserDTO } from 'models/dtos/user';
import { User, UserInEvent } from 'models/user';
import { gameRulesUtils } from 'utils/game-rules';

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
      pointDescription: pointIn.pointDescription,
      pointSuccessMessage: pointIn.pointSuccessMessage,
    };
  }

  public static mapPointOut (pointOut: PointType): PointDTOCreate | PointDTOUpdate {
    const toNullIfEmptyString = (v: string | null) => v === '' ? null : v;
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
      pointDescription: toNullIfEmptyString(pointOut.pointDescription),
      pointSuccessMessage: toNullIfEmptyString(pointOut.pointSuccessMessage),
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
      eventSettings: gameRulesUtils.mapEventConfigIn(eventIn.eventSettings),
    };
  }

  public static mapEventCheck (eventIn: EventCheckDTO): EventCheckDTOMapped {
    return {
      eventId: eventIn.eventId,
      eventName: eventIn.eventName,
      role: eventIn.role,
      teamColor: eventIn.teamColor,
      teamId: eventIn.teamId,
      teamName: eventIn.teamName,
      eventEndDate: eventIn.eventDuration.endDate,
      eventStartDate: eventIn.eventDuration.startDate,
    };
  }

  public static mapEventOut (eventOut: Event): EventDTOCreate | EventDTOUpdate {
    return {
      eventName: eventOut.eventName,
      eventDuration: {
        endDate: eventOut.eventEndDate,
        startDate: eventOut.eventStartDate,
      },
      eventRefreshTime: eventOut.mapRefreshTime,
      mapProperties: {
        longitude: eventOut.mapLongitude,
        latitude: eventOut.mapLatitude,
        zoom: eventOut.mapZoom,
      },
      inviteKeys: eventOut.inviteKeys,
      eventSettings: eventOut.eventSettings.map(rule => ({ ruleId: rule.ruleId, ruleValue: rule.ruleValue })),
    };
  }

  public static mapUserIn (user: UserDTO): User {
    // When user have many userEvents -> ex. signIn response
    return {
      ...user,
      userEvents: user.userEvents.map(event => ({
        ...event,
        nickname: event.nickname,
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
      nickname,
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
      nickname,
    };
  }
}
