import { Module } from 'vuex';
import { InvitationKeys } from 'models/invitations';
import { USERS_DEFAULT_CONFIG } from 'config/users-config';

const roles = USERS_DEFAULT_CONFIG.accountTypes;

export const invitations:Module<InvitationKeys, object> = {
  namespaced: true,
  state: {
    invitationKeys: [],
  },
  getters: {
    invitationKeys: state => state.invitationKeys,
    forAdmin: state => state.invitationKeys.filter(item => item.role === roles.admin),
    forObserver: state => state.invitationKeys.filter(item => item.role === roles.observer),
    forTeamLeader: state => state.invitationKeys.filter(item => item.role === roles.teamLeader),
    forTeamMember: state => state.invitationKeys.filter(item => item.role === roles.teamMember),
  },
  mutations: {
    setInvitationKeys: (state, payload) => {
      state.invitationKeys = payload;
    },
    clearStore: (state) => {
      state.invitationKeys = [];
    },
  },
};
