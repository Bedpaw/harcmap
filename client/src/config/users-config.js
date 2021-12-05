import { ACCOUNT_TYPES } from 'utils/permissions';
import { materialIcons } from '@dbetka/vue-material-icons';

const ICONS = materialIcons.names;

const { creator, admin, userObserver, teamLeader, observer } = ACCOUNT_TYPES;

const accountTypeInfo = {
  [admin]: {
    icon: ICONS.shield,
    nameKey: 'accountTypes.admin',
  },
  [teamLeader]: {
    icon: ICONS.person,
    nameKey: 'accountTypes.teamLeader',
  },
  [observer]: {
    icon: ICONS.policy,
    nameKey: 'accountTypes.observer',
  },
  [userObserver]: {
    icon: ICONS.person_search,
    nameKey: 'accountTypes.userObserver',
  },
  [creator]: {
    icon: ICONS.shield,
    nameKey: 'accountTypes.organizer',
  },
};

const availabilities = {
  seeAllPointsOnMap: [creator, admin],
  seeAllTimeOutPoints: [creator, admin],
  seeAdminStartView: [creator, admin],
};

const checkIfCan = (permittedRoles) => permittedRoles
  .some(role => permissions.checkPermissions(role));

export const userUtils = {
  getOrderedMembers: (teamMembers) => {
    const commonUsers = teamMembers.filter(user => user.accountType === ACCOUNT_TYPES.userObserver);
    const leaderUser = teamMembers.find(user => user.accountType === ACCOUNT_TYPES.common);
    commonUsers.unshift(leaderUser);
    return commonUsers;
  },
  getIcon: (event) => {
    console.log(event, accountTypeInfo);
    return accountTypeInfo[event.role].icon;
  },
  getNameKey: ({ role }) => accountTypeInfo[role].nameKey,
  isOrganizer: (user) => user.accountType === creator,
  can: {
    seeAllPointsOnMap: () => checkIfCan(availabilities.seeAllPointsOnMap),
    seeAllTimeOutPoints: () => checkIfCan(availabilities.seeAllTimeOutPoints),
    seeAdminStartView: () => checkIfCan(availabilities.seeAdminStartView),
  },
};

export const USERS_DEFAULT_CONFIG = {
  // Move accounts type here
  accountTypes: ACCOUNT_TYPES,
  accountTypeInfo,

};
