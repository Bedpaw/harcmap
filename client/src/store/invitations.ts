import { Module } from 'vuex';
import { InvitationKeys, SingleInvitationKey, SingleInvitationKeyClass } from 'models/invitations';
import { USERS_DEFAULT_CONFIG } from 'config/users-config';
import { api } from 'api';

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
    forShareEvent: (state, getters) => {
      const admin = new SingleInvitationKeyClass(getters.forAdmin[getters.forAdmin.length - 1]);
      const observer = new SingleInvitationKeyClass(getters.forObserver[getters.forObserver.length - 1]);
      const teamLeader = new SingleInvitationKeyClass(getters.forTeamLeader[getters.forTeamLeader.length - 1]);

      return {
        admin,
        observer,
        teamLeader,
      };
    },
    forShareTeam: (state, getters, rootState, rootGetters) => {
      const teamMember = new SingleInvitationKeyClass(
        getters.forTeamMember.find((item:SingleInvitationKey) => item.teamId === rootGetters['team/teamId']),
      );

      return { teamMember };
    },
  },
  mutations: {
    setInvitationKeys: (state, payload) => {
      state.invitationKeys = payload || [];
    },
    clearStore: (state) => {
      state.invitationKeys = [];
    },
  },
  actions: {
    resetInvitation ({ rootGetters, dispatch }, keyId:string) {
      const event = rootGetters['event/event'];
      const promise = api.resetInvitation(event.eventId, keyId);
      promise.then(() => dispatch('event/download', event, { root: true }));

      return promise;
    },
  },
};
