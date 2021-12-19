import { EventDuration } from 'models/dtos/event';

export enum Roles {
  // TODO merge with account Roles
  teamLeader= 'teamLeader',
  admin = 'admin',
  observer = 'observer',
  teamMember = 'teamMember',
  creator = 'creator',
}

interface UserEventDTO {
  eventId: string;
  eventName: string;
  eventDuration: EventDuration;
  teamId: string;
  teamName: string;
  role: Roles;
  isBanned: boolean;
}

export interface SignInResponseDTO {
  email: string,
  userEvents: UserEventDTO[]
}
