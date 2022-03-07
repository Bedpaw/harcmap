import { Module } from 'vuex';
import { TeamDTO } from 'models/dtos/team';
import { PointType } from 'models/point';

export const team:Module<TeamDTO, object> = {
  namespaced: true,
  state: {
    teamId: '',
    teamName: '',
    collectedPoints: [],
    teamMembers: [],
  },
  getters: {
    collectedPointsIds: state => state.collectedPoints,
    teamId: state => state.teamId,
    teamMembers: state => state.teamMembers,
    teamName: state => state.teamName,
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
    setTeam: (state, { teamId, teamName, collectedPoints, teamMembers }) => {
      state.teamId = teamId;
      state.teamName = teamName;
      state.collectedPoints = collectedPoints;
      state.teamMembers = teamMembers;
    },
    addCollectedPoint: (state, pointId) => {
      state.collectedPoints.push(pointId);
    },
  },
};
