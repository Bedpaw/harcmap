import { ACCOUNT_TYPES } from 'utils/permissions';
import { materialIcons } from '@dbetka/vue-material-icons';
import { ROUTES } from 'config/routes-config';
import { store } from 'store';
import { TeamMemberDTO as TeamMember } from 'models/dtos/team';

const ICONS = materialIcons.names;

const { teamMember, teamLeader, creator, admin, observer } = ACCOUNT_TYPES;
const accountTypeInfo = {
  [creator]: {
    icon: ICONS.security,
    nameKey: 'accountTypes.organizer',
    menuLinks: [
      ROUTES.scoreboard,
      ROUTES.shareEvent,
      ROUTES.editEvent,
      ROUTES.newPoint,
    ],
    menuCentralButton: ROUTES.adminPanel,
  },
  [admin]: {
    icon: ICONS.shield,
    nameKey: 'accountTypes.admin',
    menuLinks: [
      ROUTES.scoreboard,
      ROUTES.shareEvent,
      ROUTES.editEvent,
      ROUTES.newPoint,
    ],
    menuCentralButton: ROUTES.adminPanel,
  },
  [observer]: {
    icon: ICONS.policy,
    nameKey: 'accountTypes.observer',
    menuLinks: [
      ROUTES.scoreboard,
    ],
    menuCentralButton: ROUTES.spectatorPanel,
  },
  [teamLeader]: {
    icon: ICONS.supervisor_account,
    nameKey: 'accountTypes.teamLeader',
    menuLinks: [
      ROUTES.teamView,
      ROUTES.collectPoint,
      ROUTES.about,
      ROUTES.collectedPoints,
      ROUTES.shareTeam,
    ],
    menuCentralButton: ROUTES.collectPoint,

  },
  [teamMember]: {
    icon: ICONS.person,
    nameKey: 'accountTypes.userObserver',
    menuLinks: [
      ROUTES.teamView,
      ROUTES.about,
      ROUTES.collectedPoints,
    ],
    menuCentralButton: ROUTES.collectedPoints,
  },

};

const availabilities = {
  seeAllPointsOnMap: [creator, admin],
  seeAllTimeOutPoints: [creator, admin],
  seeAdminStartView: [creator, admin, observer],
  editOrDeletePoints: [creator, admin],
  seeAllTeamsTracks: [creator, admin, observer],
};

const checkIfCan = (permittedRoles: string[]) => permittedRoles.includes(store.getters['event/role']);

export const userUtils = {
  getOrderedMembers: (teamMembers: TeamMember[]) => {
    /* Returns list of user with leader at 0 index */
    const commonUsers = teamMembers.filter(user => user.role === ACCOUNT_TYPES.teamMember);
    const leaderUser = teamMembers.find(user => user.role === ACCOUNT_TYPES.teamLeader);
    if (leaderUser) {
      commonUsers.unshift(leaderUser);
    }
    return commonUsers;
  },
  getIcon: (obj: { role: string }) => accountTypeInfo[obj.role].icon,
  getNameKey: (role: string) => accountTypeInfo[role].nameKey,
  getMenuLinks: (role = store.getters['event/role']) => accountTypeInfo[role].menuLinks,
  getMenuCentralButton: (role = store.getters['event/role']) => accountTypeInfo[role].menuCentralButton,

  isOrganizer: (user: { role: string }) => user.role === creator,

  can: {
    seeAllPointsOnMap: () => checkIfCan(availabilities.seeAllPointsOnMap),
    seeAllTimeOutPoints: () => checkIfCan(availabilities.seeAllTimeOutPoints),
    seeAdminStartView: () => checkIfCan(availabilities.seeAdminStartView),
    editOrDeletePoints: () => checkIfCan(availabilities.editOrDeletePoints),
    seeAllTeamsTracks: () => checkIfCan(availabilities.seeAllTeamsTracks),
  },
};

export const USERS_DEFAULT_CONFIG = {
  // Move accounts type here
  accountTypes: ACCOUNT_TYPES,
  accountTypeInfo,
};
