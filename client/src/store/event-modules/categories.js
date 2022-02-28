import { api } from 'api';
import { map } from 'map';

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
      .filter(category => category.pointValue !== 0), // TODO Rethink if points have categories
    timeoutCategories: state => state.categories
      .filter(category => category.pointValue === 0),
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
    editPointCategory (context, { pointCategory, pointCategoryId, eventId = context.getters.eventId }) {
      return new Promise((resolve, reject) => {
        api.updatePointCategory(pointCategory, pointCategoryId, eventId)
          .then(() => map.updateMapFeatures())
          .then(() => resolve())
          .catch(reject);
      });
    },
    deletePointCategory (context, { pointCategoryId, eventId = context.getters.eventId }) {
      return new Promise((resolve, reject) => {
        api.deletePointCategory(pointCategoryId, eventId)
          .then(() => map.updateMapFeatures())
          .then(() => resolve())
          .catch(reject);
      });
    },
  },
};
