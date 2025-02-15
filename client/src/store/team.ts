import { Module } from 'vuex';
import { TeamDTO } from 'models/dtos/team';
import { PointType } from 'models/point';
import { api } from 'api';
import { Team } from 'models/team';

const initState = () => ({
  teamId: '',
  teamName: '',
  teamColor: '',
  collectedPoints: [],
  teamMembers: [],
});

export const team:Module<TeamDTO, object> = {
  namespaced: true,
  state: {
    ...initState(),
  },
  getters: {
    collectedPointsIds: state => state.collectedPoints,
    teamId: state => state.teamId,
    teamMembers: state => state.teamMembers,
    teamName: state => state.teamName,
    teamColor: state => state.teamColor,
    collectedPoints (state, getters, rootState, rootGetters): PointType[] {
      const collectedPoints = [];
      for (const pointId of getters.collectedPointsIds) {
        const point = rootGetters['event/getPointById'](pointId);
        point ? collectedPoints.push(point) : undefined;
      }
      return collectedPoints;
    },
    sumOfCollectedPoints (state, getters, rootState, rootGetters) {
      return getters.collectedPoints.map((point: PointType) => {
        return rootGetters['event/getCategoryById'](point.pointCategoryId).pointValue;
      })
        .reduce((a: number, b: number) => a + b, 0);
    },
  },
  mutations: {
    setTeam: (state, { teamId, teamName, collectedPoints, teamMembers, teamColor }) => {
      state.teamId = teamId;
      state.teamName = teamName;
      state.teamColor = teamColor;
      state.collectedPoints = collectedPoints;
      state.teamMembers = teamMembers;
    },
    addCollectedPoint: (state, pointId) => {
      state.collectedPoints.push(pointId);
    },
    resetTeamState: (state) => {
      Object.assign(state, initState());
    },
  },
  actions: {
    downloadTeam (context, { eventId, teamId }) {
      return new Promise((resolve, reject) => {
        (api.getTeamByEventId(eventId, teamId) as Promise<Team>)
          .then((team) => {
            context.commit('setTeam', { ...team, teamId });
            resolve(team);
          })
          .catch(reject);
      });
    },
  },
};
