interface UserEvent {
  eventId: string
  eventName: string
  teamId: string
  teamName: string
  role: string
  isBanned: boolean
}

export interface UserDTO {
  email: string
  userEvents: UserEvent[]
}
