import { ACCOUNT_TYPES } from 'utils/permissions';
import { ICONS } from '@dbetka/vue-material-icons';

const { organizer, admin, userObserver, common, observer } = ACCOUNT_TYPES;

const accountTypeInfo = {
  [admin]: {
    icon: ICONS.shield,
    nameKey: 'accountTypes.admin',
  },
  [common]: {
    icon: ICONS.person,
    nameKey: 'accountTypes.common',
  },
  [observer]: {
    icon: ICONS.policy,
    nameKey: 'accountTypes.observer',
  },
  [userObserver]: {
    icon: ICONS.person_search,
    nameKey: 'accountTypes.userObserver',
  },
  [organizer]: {
    icon: ICONS.shield,
    nameKey: 'accountTypes.organizer',
  },
};

const availabilities = {
  seeAllPointsOnMap: [organizer, admin],
  seeAllTimeOutPoints: [organizer, admin],
  seeAdminStartView: [organizer, admin],
};

const checkIfCan = (permittedRoles) => permittedRoles
  .some(role => permissions.checkPermissions(role));

export const userUtils = {
  getIcon: ({ accountType }) => accountTypeInfo[accountType].icon,
  getNameKey: ({ accountType }) => accountTypeInfo[accountType].nameKey,
  isOrganizer: (user) => user.accountType === organizer,
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
