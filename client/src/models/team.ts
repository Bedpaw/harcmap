export interface TeamMember {
  userId: string;
  email: string;
  role: string;
  nickname: string;
}

export interface Team {
  teamId: string;
  teamName: string;
  collectedPoints: string[]
  teamMembers: TeamMember[]
}
