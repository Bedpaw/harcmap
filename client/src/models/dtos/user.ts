export interface UserEvent {
  eventId: string
  eventName: string
  eventDuration: {
    startDate: number,
    endDate: number,
  },
  teamId: string
  teamName: string
  role: string
  isBanned: boolean
}

export interface UserDTO {
  email: string
  userEvents: UserEvent[]
}
