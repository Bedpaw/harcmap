import Cookies from 'js-cookie';
import { eventUtils } from 'utils/event';
import { map } from 'map';
import { eventStoreModules as Modules } from 'store/event-modules';
import { api } from 'api';
import { pointUtils } from 'utils/point';
import { permissions } from 'utils/permissions';

export default {
  namespaced: true,
  state: {
    eventId: null,
    eventName: '',
    eventStartDate: null,
    eventEndDate: null,
    userRole: '',
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
    pointsVisibleOnMap: (state, getters, rootState, rootGetters) =>
      state.points.filter(
        (point) => pointUtils.pointIsVisibleOnMap(point,
          {
            hiddenPointId: getters.hidePoint.pointId,
            pointsCollectedByUser: rootGetters['team/collectedPointsIds'],
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
      state.userRole = data.role;
      const cookieJSON = Cookies.get('mapPosition');
      if (cookieJSON) {
        const cookie = JSON.parse(cookieJSON);
        state.mapLatitude = cookie.mapLatitude;
        state.mapLongitude = cookie.mapLongitude;
        state.mapZoom = cookie.mapZoom;
      }
    },
    setId: (state, payload) => (state.eventId = payload),
    setUserRole: (state, payload) => (state.userRole = payload),
    ...Modules.mutations,
  },
  actions: {
    download (context, { eventId, teamId, role }) {
      return new Promise((resolve, reject) => {
        let event;
        api.getEventById(eventId)
          .then(data => (event = { ...data, eventId }))
          .then(() => api.getCategoriesByEventId(eventId))
          .then(categories => (event.categories = categories))
          .then(() => api.getTeamByEventId(eventId, teamId))
          .then((data) => context.commit('team/setTeam', { ...data, teamId }, { root: true }))
          .then(() => {
            const IsBeforeStart = eventUtils.isBeforeStart(event);
            const IsCommonUser = permissions.checkIsCommonUser();
            if (IsBeforeStart && IsCommonUser) return [];
            else return api.getPointsByEventId(eventId);
          })
          .then(points => {
            event.points = points.map(point => ({ ...point }));
            console.log('role', role);
            context.commit('setEvent', { ...event, role });
            context.commit('setId', eventId);
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
