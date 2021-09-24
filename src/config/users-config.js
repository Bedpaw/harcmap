import { ACCOUNT_TYPES } from 'utils/permissions';
import { ICONS } from '@dbetka/vue-material-icons';

export const USERS_DEFAULT_CONFIG = {
  // Move accounts type here
  accountTypeInfo: {
    [ACCOUNT_TYPES.admin]: {
      icon: ICONS.shield,
      nameKey: 'accountTypes.admin',
    },
    [ACCOUNT_TYPES.common]: {
      icon: ICONS.person,
      nameKey: 'accountTypes.common',
    },
    [ACCOUNT_TYPES.observer]: {
      icon: ICONS.policy,
      nameKey: 'accountTypes.observer',
    },
    [ACCOUNT_TYPES.userObserver]: {
      icon: ICONS.person_search,
      nameKey: 'accountTypes.userObserver',
    },
  },
};
