import { EventDuration } from 'models/dtos/event';

export interface UserEventDTO {
  eventId: string
  eventName: string
  eventDuration: EventDuration
  teamId: string
  teamName: string
  role: string
  isBanned: boolean
  nickname: string
}

export interface UserDTO {
  email: string
  isActive: boolean
  userId: string
  userEvents: UserEventDTO[]
}
