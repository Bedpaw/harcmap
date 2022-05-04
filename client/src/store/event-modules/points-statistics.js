import { uCheck } from '@dbetka/utils';
import { MACROS } from '../../utils/macros';
const initState = () => ({
});
export default {
  state: {
    ...initState(),
  },
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
        rootGetters['event/numberOfPermanentPointsByCategoryId'](categoryId) * 100;
    },
    numberOfPermanentPointsByCategoryId: (state, getters, rootState, rootGetters) => categoryId => {
      const listOfPoints = rootGetters['event/points'].filter(point => {
        return point.pointCategoryId === categoryId && point.pointType === MACROS.pointType.permanent;
      });
      return (listOfPoints || []).length;
    },
    pointValueByPointCategory: (state, getters, rootState, rootGetters) => pointCategoryId => {
      const category = rootGetters['event/getCategoryById'](pointCategoryId);
      return (category || {}).pointValue;
    },
  },
  mutations: {
    resetPointsStatisticsState: (state) => {
      Object.assign(state, initState());
    },
  },
  actions: {},
};
