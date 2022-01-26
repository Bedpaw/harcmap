import { uCheck } from '@dbetka/utils';

export default {
  state: {},
  getters: {
    numberOfCollectedPointsByCategoryId: (state, getters, rootState, rootGetters) => categoryId => {
      const listOfPoints = rootGetters['event/points'].filter(point => {
        const sameCategory = point.pointCategoryId === categoryId;
        const isNotNull = uCheck.isNotNull(point.pointCollectionTime);
        return isNotNull && sameCategory;
      });
      return (listOfPoints || []).length;
    },
    percentageProgressByCategoryId: (state, getters, rootState, rootGetters) => categoryId => {
      return rootGetters['event/numberOfCollectedPointsByCategoryId'](categoryId) /
        rootGetters['event/numberOfPointsByCategoryId'](categoryId) * 100;
    },
    numberOfPointsByCategoryId: (state, getters, rootState, rootGetters) => categoryId => {
      const listOfPoints = rootGetters['event/points'].filter(point => {
        return point.pointCategoryId === categoryId;
      });
      return (listOfPoints || []).length;
    },
    pointValueByPointCategory: (state, getters, rootState, rootGetters) => pointCategoryId => {
      const category = rootGetters['event/getCategoryById'](pointCategoryId);
      return (category || {}).pointValue;
    },
  },
  mutations: {},
  actions: {},
};
