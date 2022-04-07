import { InvitationKeys } from 'models/invitations';
import { GameRuleEntryDTO } from 'models/game-rules';

export interface EventDuration {
  startDate: number;
  endDate: number;
}
interface MapProperties {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface EventDTOCreate {
  eventName: string;
  eventDuration: EventDuration;
  mapProperties: MapProperties;
  inviteKeys: InvitationKeys;
  eventRefreshTime: number;
  eventSettings: GameRuleEntryDTO[]
}

export interface EventDTO extends EventDTOCreate {
  eventId: string;
  eventKey: string;
}

export interface JoinEventParams {
  userId: string,
  eventKey: string,
  nickname: string
  teamName?: string,
  teamColor?: string,
}
export type EventDTOUpdate = EventDTOCreate;
