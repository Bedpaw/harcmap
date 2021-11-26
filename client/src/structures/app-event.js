import { DEFAULT_EVENT_CONFIG } from 'config/event-config';
import { idUtils } from 'utils/id';
import { gameRulesUtils } from 'utils/game-rules';

export class AppEvent {
  constructor ({
    eventId = idUtils.generateNewId(),
    eventName = '',
    eventStartDate = DEFAULT_EVENT_CONFIG.eventStartDate,
    eventEndDate = DEFAULT_EVENT_CONFIG.eventEndDate,
    mapLatitude,
    mapLongitude,
    mapZoom = DEFAULT_EVENT_CONFIG.mapZoom,
    mapRefreshTime = DEFAULT_EVENT_CONFIG.mapRefreshTime,
    eventRules = DEFAULT_EVENT_CONFIG.gameRules,
  }) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.eventStartDate = eventStartDate;
    this.eventEndDate = eventEndDate;
    this.mapLatitude = mapLatitude;
    this.mapLongitude = mapLongitude;
    this.mapZoom = mapZoom;
    this.mapRefreshTime = mapRefreshTime;
    this.eventRules = gameRulesUtils.mapEventConfigIn(eventRules);
  }
}
