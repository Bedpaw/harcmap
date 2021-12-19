import { Roles } from 'models/dtos/auth';

interface UserEvent {
  eventId: string;
  eventName: string;
  eventStartDate: number;
  eventEndDate: number;
  teamId: string;
  teamName: string;
  role: Roles;
  isBanned: boolean;
}

export interface SignInResponse {
  email: string,
  userEvents: UserEvent[]
}
