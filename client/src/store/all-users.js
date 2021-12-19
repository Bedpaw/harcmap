import { uCheck } from '@dbetka/utils';
import { api } from 'api';

export default {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    users: state => state.users,
    usersNotTeams: state => state.users.reduce((prev, curr) => {
      return [...prev, ...curr.teamMembers];
    }, []),
    commonUsers: state => state.users,
    collectedPointsByUser: (state, getters, rootState, rootGetters) => user => {
      const collectedPoints = [];
      for (const pointId of user.collectedPoints) {
        const point = rootGetters['event/getPointById'](pointId);

        uCheck.isDefined(point) ? collectedPoints.push(point) : undefined;
      }
      return collectedPoints;
    },
    scoreByUser: (state, getters, rootState, rootGetters) => user => {
      return getters.collectedPointsByUser(user)
        .map(point => rootGetters['event/pointValueByPointCategory'](point.pointCategory))
        .reduce((a, b) => (a + b), 0);
    },
  },
  mutations: {
    setUsers: (state, payload) => (state.users = payload),
  },
  actions: {
    download (context, eventId) {
      return new Promise((resolve, reject) => {
        api.getAllTeamsByEventId(eventId)
          .then((teams) => {
            context.commit('setUsers', teams);
            resolve(teams);
          })
          .catch(reject);
      });
    },
  },
};
