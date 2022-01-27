import { MACROS } from 'utils/macros';
import { api } from 'api';

const initState = () => ({
  categories: [],
});
export default {
  state: {
    ...initState(),
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
  mutations: {
    addCategory: (state, pointCategory) => {
      state.categories.push(pointCategory);
    },
    resetCategoriesState: (state) => {
      Object.assign(state, initState());
    },
  },
  actions: {
    addPointCategory (context, { pointCategoryId, eventId = context.getters.eventId }) {
      return new Promise((resolve, reject) => {
        api.addPointCategory(pointCategoryId, eventId)
          .then(pointCategory => context.commit('addCategory', pointCategory))
          .then(() => resolve())
          .catch(reject);
      });
    },
  },
};
