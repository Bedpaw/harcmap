import { InvitationKeys } from 'models/invitations';

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
  eventKey: string;
  eventDuration: EventDuration;
  mapProperties: MapProperties;
  inviteKeys: InvitationKeys;
  eventRefreshTime: number
}

export interface EventDTO extends EventDTOCreate {
  eventId: string;
}

export type EventDTOUpdate = EventDTOCreate;
