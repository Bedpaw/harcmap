import { Module } from 'vuex';
import { InvitationKeys, SingleInvitationKey } from 'models/invitations';
import { USERS_DEFAULT_CONFIG } from 'config/users-config';

const roles = USERS_DEFAULT_CONFIG.accountTypes;

export const invitations:Module<InvitationKeys, object> = {
  namespaced: true,
  state: {
    invitationKeys: [],
  },
  getters: {
    invitationKeys: state => state.invitationKeys,
    forAdmin: state => state.invitationKeys.filter(item => item.role === roles.admin) || [],
    forObserver: state => state.invitationKeys.filter(item => item.role === roles.observer) || [],
    forTeamLeader: state => state.invitationKeys.filter(item => item.role === roles.teamLeader) || [],
    forTeamMember: state => state.invitationKeys.filter(item => item.role === roles.teamMember) || [],
    forShareEvent: (state, getters) => ({
      admin: getters.forAdmin.at(-1)?.key || '',
      observer: getters.forObserver?.at(-1)?.key || '',
      teamLeader: getters.forTeamLeader?.at(-1)?.key || '',
    }),
    forShareTeam: (state, getters, rootState, rootGetters) => ({
      // teamMember: getters.forTeamMember.at(-1)?.key || '', // .filter(item => item.teamKey === teamKey)?.key,
      teamMember: getters.forTeamMember.find(
        (item:SingleInvitationKey) => item.teamId === rootGetters['team/teamId'],
      )?.key || '',
    }),
  },
  mutations: {
    setInvitationKeys: (state, payload) => {
      state.invitationKeys = payload || [];
    },
    clearStore: (state) => {
      state.invitationKeys = [];
    },
  },
};
