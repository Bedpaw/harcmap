import { InvitationKeys } from 'models/invitations';
import { GameRule } from 'models/game-rules';

export interface Event {
  eventId: string;
  eventKey: string;
  eventName: string;
  eventStartDate: number;
  eventEndDate: number;
  mapLatitude: number;
  mapLongitude: number;
  mapZoom: number;
  mapRefreshTime: number;
  inviteKeys: InvitationKeys;
  eventSettings: GameRule[]
}
