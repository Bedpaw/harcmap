import { MACROS } from 'utils/macros';
import { api } from 'api';
export default {
  state: {
    categories: [],
  },
  getters: {
    getCategoryById: state => categoryId => {
      return state.categories.find(category => category.categoryId === categoryId);
    },
    categories: state => state.categories,
    permanentCategories: state => state.categories
      .filter(category => category.pointType === MACROS.pointType.permanent),
    timeoutCategories: state => state.categories
      .filter(category => category.pointType === MACROS.pointType.timeout),
  },
  mutations: {},
  actions: {
    addPointCategory (context, { pointCategory, eventId = context.getters.eventId }) {
      return new Promise((resolve, reject) => {
        api.addPointCategory(pointCategory, eventId)
          .then(() => resolve())
          .catch(reject);
      });
    },
  },
};
