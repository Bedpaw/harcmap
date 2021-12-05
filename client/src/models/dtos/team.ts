export interface TeamMember {
  email: string;
  userId: string;
  role: string;
  // nickname: string;
}

export interface TeamDTO {
  teamId: string;
  teamName: string;
  collectedPoints: string[]
  teamMembers: TeamMember[]
}
