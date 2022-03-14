import { store } from 'store';

export type AccountTypesStringType = 'teamLeader' | 'admin' | 'observer' | 'teamMember' | 'creator'

// ACCOUNT_TYPES is available in vue templates
export const ACCOUNT_TYPES = {
  teamLeader: 'teamLeader',
  admin: 'admin',
  observer: 'observer',
  teamMember: 'teamMember',
  creator: 'creator',
};

export const permissions = {
  checkPermissions (accountType: string) {
    const userAccountType = store.getters['event/role'];
    return userAccountType === accountType;
  },
  checkIsCreator () {
    return this.checkPermissions(ACCOUNT_TYPES.creator);
  },
  checkIsAdmin () {
    return this.checkPermissions(ACCOUNT_TYPES.admin) || this.checkIsCreator();
  },
  checkIsObserver () {
    return this.checkPermissions(ACCOUNT_TYPES.observer) || this.checkIsAdmin();
  },
  checkIsTeamMember () {
    return this.checkPermissions(ACCOUNT_TYPES.teamMember);
  },
  checkIsTeamLeader () {
    return this.checkPermissions(ACCOUNT_TYPES.teamLeader);
  },
  checkIsCommonUser () {
    return this.checkIsTeamLeader() || this.checkIsTeamMember();
  },
};
