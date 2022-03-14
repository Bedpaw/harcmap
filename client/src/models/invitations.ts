export interface SingleInvitationKey {
  keyId: string;
  key: string;
  role: string;
  teamId: string | null;
}

export interface InvitationKeys {
  invitationKeys: SingleInvitationKey[]
}
