export interface SingleInvitationKey {
  keyId: string;
  key: string;
  role: string;
}

export interface InvitationKeys {
  invitationKeys: SingleInvitationKey[]
}
