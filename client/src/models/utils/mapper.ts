import { PointDTO, PointDTOCreate, PointDTOUpdate } from 'models/dtos/point';
import { PointType } from 'models/point';
import { EventCheckDTO, EventCheckDTOMapped, EventDTO, EventDTOCreate, EventDTOUpdate } from 'models/dtos/event';
import { Event } from 'models/event';
import { UserDTO } from 'models/dtos/user';
import { User, UserInEvent } from 'models/user';
import { gameRulesUtils } from 'utils/game-rules';
import { appStorage } from 'utils/storage';

export class Mapper {

  public static mapPointIn (pointIn: PointDTO): PointType {
    // TODO mock before backend
    const mockDes = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const mockMessage = 'Lorem ipsum dolor sit amet. Etiam malesuada nibh sit amet dolor varius, et venenatis justo mattis. Ut commodo mi nec augue placerat, eget convallis diam ultricies.';
    const fakeDBGET = (pointId: string, prop: string) => appStorage.getItem(prop + pointId);

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
      pointDescription: pointIn.pointDescription ?? fakeDBGET(pointIn.pointId, 'pointDescription') ?? mockDes,
      pointSuccessMessage: pointIn.pointSuccessMessage ?? fakeDBGET(pointIn.pointId, 'pointSuccessMessage') ?? mockMessage,
    };
  }

  public static mapPointOut (pointOut: PointType): PointDTOCreate | PointDTOUpdate {
    appStorage.setItem(`pointDescription${pointOut.pointId}`, pointOut.pointDescription);
    appStorage.setItem(`pointSuccessMessage${pointOut.pointId}`, pointOut.pointSuccessMessage);
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
