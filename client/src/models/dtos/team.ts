export interface TeamMemberDTO {
  userId: string;
  email: string;
  role: string;
  nickname: string;
}

export interface TeamDTO {
  teamId: string;
  teamName: string;
  teamColor: string;
  collectedPoints: string[]
  teamMembers: TeamMemberDTO[]
}
