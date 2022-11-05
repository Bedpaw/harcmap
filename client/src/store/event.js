import { eventUtils } from 'utils/event';
import { map } from 'map';
import { eventStoreModules as Modules } from 'store/event-modules';
import { api } from 'api';
import { pointUtils } from 'utils/point';
import { appStorage } from 'utils/storage';
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';
import { pointCategoryUtils } from 'utils/point-category';
import { userUtils } from 'config/users-config';

const initState = () => ({
  eventId: null,
  eventName: '',
  eventStartDate: null,
  eventEndDate: null,
  role: '',
  nickname: '',
  inviteKeys: [],
  eventSettings: { ...DEFAULT_EVENT_CONFIG.gameRules },
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
    role: state => state.role,
    nickname: state => state.nickname,
    eventSettings: state => state.eventSettings,
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
      state.points.filter((point) => pointUtils.pointIsVisibleOnMap(point, getters.hidePoint.pointId, getters['event/role'])),
    pointsDisplayedAsCollected: (state, getters, rootState, rootGetters) =>
      getters.pointsVisibleOnMap.filter(point => pointUtils.pointIsDisplayedAsCollected(point, getters['event/role'], {
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
      state.role = data.role;
      state.nickname = data.nickname;
      const storageData = appStorage.getItem(appStorage.appKeys.mapPosition, appStorage.getIds.eventIdAndEmail());
      if (storageData) {
        const { mapLatitude, mapLongitude, mapZoom } = storageData;
        state.mapLatitude = mapLatitude;
        state.mapLongitude = mapLongitude;
        state.mapZoom = mapZoom;
      }
    },
    setId: (state, payload) => (state.eventId = payload),
    setUserRole: (state, payload) => (state.role = payload),
    ...Modules.mutations,
    resetEventState: (state) => {
      Object.assign(state, initState());
    },
  },
  actions: {
    resetState (context) {
      context.commit('resetEventState');
      context.commit('resetPointsState');
      context.commit('resetPointsStatisticsState');
      context.commit('resetMapState');
      context.commit('resetCategoriesState');
    },
    async download (context, { eventId, teamId, role, nickname }) {
      let teamsPromise;
      const eventPromise = api.getEventById(eventId);
      const categoriesPromise = api.getCategoriesByEventId(eventId);

      if (userUtils.can.fetchAllTeamsData(role))
        teamsPromise = context.dispatch('groups/downloadTeams', eventId, { root: true });
      else {
        teamsPromise = context.dispatch('team/downloadTeam', {
          eventId,
          teamId,
        }, { root: true });
      }

      let [event, categories] = await Promise.all([
        eventPromise,
        categoriesPromise,
        teamsPromise,
      ]);

      const shouldNotSeePoints = eventUtils.isBeforeStart(event) && userUtils.can.seePointsBeforeEventStart(role) === false;
      const points = shouldNotSeePoints ? [] : await api.getPointsByEventId(eventId);

      categories = await pointCategoryUtils.getDefaultCategoriesIfEmpty(categories, eventId);
      event = { ...event, eventId, categories, points, role, nickname };
      context.commit('invitations/setInvitationKeys', event.inviteKeys, { root: true });
      context.commit('setEvent', event);
      return event;
    },
    collectPoint (context, pointKey) {
      return new Promise((resolve, reject) => {
        api.collectPoint(context.getters.eventId, pointKey)
          .then((point) => {
            context.commit('updatePoint', point);
            context.commit('team/addCollectedPoint', point.pointId, { root: true });
            resolve(point);
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
    addEvent (context, { event, userId }) {
      return new Promise((resolve, reject) => {
        api.addEvent(event, userId)
          .then((eventResponse) => resolve(eventResponse))
          .catch(reject);
      });
    },
    ...Modules.actions,
  },
};
