import { materialIcons } from '@dbetka/vue-material-icons';
import { ROUTES } from 'config/routes-config';
import { TeamMemberDTO as TeamMember } from 'models/dtos/team';

const ICONS = materialIcons.names;

export const ACCOUNT_TYPES = {
  teamLeader: 'teamLeader',
  admin: 'admin',
  observer: 'observer',
  teamMember: 'teamMember',
  creator: 'creator',
};

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
  seeAllPointsOnMap: [creator, admin, observer],
  seeAllTimeOutPoints: [creator, admin, observer],
  seeAdminStartView: [creator, admin, observer],
  editOrDeletePoints: [creator, admin],
  seeAllTeamsTracks: [creator, admin, observer],
  fetchAllTeamsData: [creator, admin, observer],
  seePointsBeforeEventStart: [creator, admin, observer],
  seePointsSuccessMessageDescription: [creator, admin, observer],
};

const checkIfCan = (permittedRoles: string[], role: string) => permittedRoles.includes(role);

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
  getMenuLinks: (role: string) => accountTypeInfo[role].menuLinks,
  getMenuCentralButton: (role: string) => accountTypeInfo[role].menuCentralButton,
  isOrganizer: (user: { role: string }) => user.role === creator,
  can: {
    seeAllPointsOnMap: (role: string) => checkIfCan(availabilities.seeAllPointsOnMap, role),
    seeAllTimeOutPoints: (role: string) => checkIfCan(availabilities.seeAllTimeOutPoints, role),
    seeAdminStartView: (role: string) => checkIfCan(availabilities.seeAdminStartView, role),
    editOrDeletePoints: (role: string) => checkIfCan(availabilities.editOrDeletePoints, role),
    seeAllTeamsTracks: (role: string) => checkIfCan(availabilities.seeAllTeamsTracks, role),
    fetchAllTeamsData: (role: string) => checkIfCan(availabilities.fetchAllTeamsData, role),
    seePointsBeforeEventStart: (role: string) => checkIfCan(availabilities.seePointsBeforeEventStart, role),
    seePointsSuccessMessageDescription: (role: string) => checkIfCan(availabilities.seePointsSuccessMessageDescription, role),
  },
};

export const USERS_DEFAULT_CONFIG = {
  // Move accounts type here
  accountTypes: ACCOUNT_TYPES,
  accountTypeInfo,
};
