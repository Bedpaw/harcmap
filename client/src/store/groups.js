import { api } from 'api';

export default {
  namespaced: true,
  state: {
    users: [],
    teams: [],
  },
  getters: {
    users: state => state.users,
    teams: state => state.teams,
    collectedPointsByTeam: (state, getters, rootState, rootGetters) => team => {
      const collectedPoints = [];
      for (const pointId of team.collectedPoints) {
        const point = rootGetters['event/getPointById'](pointId);
        if (point) collectedPoints.push(point);
      }
      return collectedPoints;
    },
    scoreByTeam: (state, getters, rootState, rootGetters) => team => {
      return getters.collectedPointsByTeam(team)
        .map(point => rootGetters['event/pointValueByPointCategory'](point.pointCategoryId))
        .reduce((a, b) => (a + b), 0);
    },
  },
  mutations: {
    setUsers: (state, payload) => (state.users = payload),
    setTeams: (state, payload) => (state.teams = payload),
    resetState: (state) => {
      state.users = [];
      state.teams = [];
    },
  },
  actions: {
    downloadTeams (context, eventId) {
      return new Promise((resolve, reject) => {
        api.getAllTeamsByEventId(eventId)
          .then((teams) => {
            context.commit('setTeams', teams);
            resolve(teams);
          })
          .catch(reject);
      });
    },
    downloadUsers (context, eventId) {
      return new Promise((resolve, reject) => {
        api.getAllUsersByEventId(eventId)
          .then((users) => {
            context.commit('setUsers', users);
            resolve(users);
          })
          .catch(reject);
      });
    },
  },
};
