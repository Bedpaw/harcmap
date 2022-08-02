export interface SingleInvitationKey {
  keyId: string;
  key: string;
  role: string;
  teamId: string | null;
}

export interface InvitationKeys {
  invitationKeys: SingleInvitationKey[]
}

export class SingleInvitationKeyClass {
  keyId
  key
  role
  teamId

  constructor (props:SingleInvitationKey) {
    props = props || {} as SingleInvitationKey;
    this.keyId = props.keyId || '';
    this.key = props.key || '';
    this.role = props.role || '';
    this.teamId = props.teamId || '';
  }
}
