import Cookies from 'js-cookie';
import { eventUtils } from 'utils/event';
import { map } from 'map';
import { eventStoreModules as Modules } from 'store/event-modules';
import { api } from 'api';
import { pointUtils } from 'utils/point';

export default {
  namespaced: true,
  state: {
    eventId: null,
    eventName: '',
    eventStartDate: null,
    eventEndDate: null,
    ...Modules.state,
  },
  getters: {
    event: state => state,
    eventName: state => state.eventName,
    eventStartDate: state => state.eventStartDate,
    eventEndDate: state => state.eventEndDate,
    eventId: state => state.eventId,
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
    pointsVisibleOnMap: (state, getters, rootState, rootGetters) =>
      state.points.filter(
        (point) => pointUtils.pointIsVisibleOnMap(point,
          {
            hiddenPointId: getters.hidePoint.pointId,
            pointsCollectedByUser: rootGetters['user/collectedPointsIds'],
            mapRefreshTime: state.mapRefreshTime,
          },
        )),
    ...Modules.getters,
  },
  mutations: {
    setEvent: (state, data) => {
      Object.assign(state, { ...data });
      state.mapDefaultLatitude = data.mapLatitude;
      state.mapDefaultLongitude = data.mapLongitude;
      state.mapDefaultZoom = data.mapZoom;
      const cookieJSON = Cookies.get('mapPosition');
      if (cookieJSON) {
        const cookie = JSON.parse(cookieJSON);
        state.mapLatitude = cookie.mapLatitude;
        state.mapLongitude = cookie.mapLongitude;
        state.mapZoom = cookie.mapZoom;
      }
    },
    setId: (state, payload) => (state.eventId = payload),
    ...Modules.mutations,
  },
  actions: {
    download (context, eventId = context.state.eventId) {
      return new Promise((resolve, reject) => {
        let event;
        api.getEventById(eventId)
          .then(data => (event = { ...data, eventId }))
          .then(() => api.getCategoriesByEventId(eventId))
          .then(categories => (event.categories = categories))
          .then(() => {
            const IsBeforeStart = eventUtils.isBeforeStart(event);
            const IsCommonUser = permissions.checkIsTeamLeader();
            if (IsBeforeStart && IsCommonUser) return [];
            else return api.getPointsByEventId(eventId);
          })
          .then(points => {
            event.points = points.map(point => ({ ...point }));
            context.commit('setEvent', event);
            resolve(event);
          })
          .catch(reject);
      });
    },
    collectPoint (context, pointId) {
      return new Promise((resolve, reject) => {
        api.collectPoint({
          eventId: context.getters.eventId,
          user: context.rootGetters['user/user'],
          pointId,
        })
          .then(() => {
            context.commit('updatePoint', {
              pointId,
              pointCollectionTime: Date.now(),
            });
            context.commit('user/addCollectedPointId', pointId, { root: true });
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
