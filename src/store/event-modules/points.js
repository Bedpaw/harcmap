import { map } from 'map';
import Vue from 'vue';
import { pointUtils } from 'utils/point';

const { pointIsCollected, isTimeOut, sortPointsAscending } = pointUtils;

export default {
  state: {
    points: [],
    hidePoint: {},
  },
  getters: {
    hidePoint: state => state.hidePoint,
    points: state => state.points,
    getPointById: state =>
      pointId => state.points.find(point => point.pointId === pointId),
    pointValueByPointCategory: (state, getters, rootState, rootGetters) => pointCategory => {
      const category = rootGetters['event/getCategoryById'](pointCategory);
      return (category || {}).pointValue;
    },
    getPointByOlUid: state => pointOlUid =>
      state.points.find(point => point.olUid === pointOlUid),
    getTimeoutPoints: state => sortPointsAscending(
      state.points.filter(point => isTimeOut(point))),
    allCollectedPoints: state => state.points
      .filter(point => pointIsCollected(point)),
  },
  mutations: {
    addPoint: (state, point) => state.points.push(point),
    updatePoint: (state, data) => {
      let arrayPointId = null;
      const point = state.points.find((item, id) => {
        arrayPointId = id;
        return item.pointId === data.pointId;
      });
      Vue.set(state.points, arrayPointId, Object.assign({}, point, data));
    },
    updateListOfPoints: (state, list = []) => {
      for (const newPoint of list) {
        let arrayPointId = null;
        const point = state.points.find((item, id) => {
          arrayPointId = id;
          return item.pointId === newPoint.pointId;
        });
        Vue.set(state.points, arrayPointId, Object.assign({}, point, newPoint));
      }
    },
    removePoint: (state, point) => {
      Vue.delete(state.points, state.points.indexOf(point));
    },
    setHidePoint: (state, payload) => (state.hidePoint = payload),
    clearHidePoint: (state) => (state.hidePoint = {}),
  },
  actions: {
    removePoint (context, pointId) {
      return new Promise((resolve, reject) => {
        api.removePoint({ pointId, eventId: context.getters.eventId })
          .then(() => map.updateMapFeatures())
          .then(() => resolve())
          .catch(reject);
      });
    },
    addPoint (context, { point, eventId = context.getters.eventId }) {
      return new Promise((resolve, reject) => {
        api.addPoint({ point, eventId })
          .then(() => map.updateMapFeatures())
          .then(() => resolve())
          .catch(reject);
      });
    },
    editPoint (context, { point, eventId = context.getters.eventId }) {
      return new Promise((resolve, reject) => {
        api.editPoint({ point, eventId })
          .then(() => map.updateMapFeatures())
          .then(() => resolve())
          .catch(reject);
      });
    },
  },
};
