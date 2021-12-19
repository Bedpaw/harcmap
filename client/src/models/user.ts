export interface UserEvent {
  eventId: string
  eventName: string
  eventStartDate: number
  eventEndDate: number
  teamId: string
  teamName: string
  role: string
  isBanned: boolean
}

export interface User {
  email: string
  isActive: boolean
  userId: string
  userEvents: UserEvent[]
}

export interface UserInEvent {
  userId: string
  email: string
  isActive: boolean
  eventId: string
  eventName: string
  eventStartDate: number
  eventEndDate: number
  teamId: string
  teamName: string
  role: string
  isBanned: boolean
}
