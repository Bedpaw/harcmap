import { eventUtils } from 'utils/event';
import { map } from 'map';
import { eventStoreModules as Modules } from 'store/event-modules';
import { api } from 'api';
import { pointUtils } from 'utils/point';
import { permissions } from 'utils/permissions';
import { appStorage } from 'utils/storage';

const initState = () => ({
  eventId: null,
  eventName: '',
  eventStartDate: null,
  eventEndDate: null,
  userRole: '',
});

export default {
  namespaced: true,
  state: {
    ...initState(),
    ...Modules.state,
  },
  getters: {
    event: state => state,
    eventName: state => state.eventName,
    eventStartDate: state => state.eventStartDate,
    eventEndDate: state => state.eventEndDate,
    eventId: state => state.eventId,
    userRole: state => state.userRole,
    eventBasicInformation: (state) => ({
      eventId: state.eventId,
      eventName: state.eventName,
      eventStartDate: state.eventStartDate,
      eventEndDate: state.eventEndDate,
      mapZoom: state.mapZoom,
      mapLongitude: state.mapLongitude,
      mapLatitude: state.mapLatitude,
      mapRefreshTime: state.mapRefreshTime,
    }),
    pointsVisibleOnMap: (state, getters) =>
      state.points.filter((point) => pointUtils.pointIsVisibleOnMap(point, getters.hidePoint.pointId)),
    pointsDisplayedAsCollected: (state, getters, rootState, rootGetters) =>
      getters.pointsVisibleOnMap.filter(point => pointUtils.pointIsDisplayedAsCollected(point, {
        pointsCollectedByTeam: rootGetters['team/collectedPointsIds'],
        mapRefreshTime: state.mapRefreshTime,
      })),
    ...Modules.getters,
  },
  mutations: {
    setEvent: (state, data) => {
      Object.assign(state, { ...data });
      state.mapDefaultLatitude = data.mapLatitude;
      state.mapDefaultLongitude = data.mapLongitude;
      state.mapDefaultZoom = data.mapZoom;
      state.userRole = data.role;
      const storageData = appStorage.getItem(appStorage.appKeys.mapPosition, appStorage.getIds.eventIdAndEmail());
      if (storageData) {
        const { mapLatitude, mapLongitude, mapZoom } = storageData;
        state.mapLatitude = mapLatitude;
        state.mapLongitude = mapLongitude;
        state.mapZoom = mapZoom;
      }
    },
    setId: (state, payload) => (state.eventId = payload),
    setUserRole: (state, payload) => (state.userRole = payload),
    ...Modules.mutations,
    resetEventState: (state) => {
      Object.assign(state, initState());
    },
  },
  actions: {
    resetState (context) {
      console.log(context.state);
      context.commit('resetEventState');
      context.commit('resetPointsState');
      context.commit('resetPointsStatisticsState');
      context.commit('resetMapState');
      context.commit('resetCategoriesState');
      console.log(context.state);
    },
    download (context, { eventId, teamId, role }) {
      return new Promise((resolve, reject) => {
        let event;
        api.getEventById(eventId)
          .then(data => (event = { ...data, eventId }))
          .then(() => api.getCategoriesByEventId(eventId))
          .then(categories => (event.categories = categories))
          .then(() => {
            if (teamId) {
              return api.getTeamByEventId(eventId, teamId);
            }
          })
          .then((data) => {
            if (data) {
              return context.commit('team/setTeam', { ...data, teamId }, { root: true });
            }
          })
          .then(() => {
            const IsBeforeStart = eventUtils.isBeforeStart(event);
            const IsCommonUser = permissions.checkIsCommonUser();
            if (IsBeforeStart && IsCommonUser) return [];
            else return api.getPointsByEventId(eventId);
          })
          .then(points => {
            event.points = points.map(point => ({ ...point }));
            context.commit('setEvent', { ...event, role });
            context.commit('setId', eventId);
            resolve(event);
          })
          .catch(reject);
      });
    },
    collectPoint (context, pointKey) {
      return new Promise((resolve, reject) => {
        // Poi9 // TODO
        console.log(context.getters.eventId);
        api.collectPoint(context.getters.eventId, pointKey)
          .then(() => {
            /*             context.commit('updatePoint', {
              pointKey,
              pointCollectionTime: Date.now(),
            });
            context.commit('user/addCollectedPointId', pointKey, { root: true }); */
            // TODO with new backend data update teamCollected and point
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updateEvent (context, updatedEvent = context.getters.eventBasicInformation) {
      return new Promise((resolve, reject) => {
        api.updateEvent(updatedEvent)
          .then(() => map.updateMapFeatures())
          .then(() => resolve())
          .catch(reject);
      });
    },
    addEvent (context, event) {
      return new Promise((resolve, reject) => {
        api.addEvent(event)
          .then(() => resolve())
          .catch(reject);
      });
    },
    ...Modules.actions,
  },
};
