import { eventUtils } from 'utils/event';
import { map } from 'map';
import { eventStoreModules as Modules } from 'store/event-modules';
import { api } from 'api';
import { pointUtils } from 'utils/point';
import { permissions } from 'utils/permissions';
import { appStorage } from 'utils/storage';
import { colorsUtils } from 'utils/macros/colors';
import { translator } from 'dictionary';
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';

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
    download (context, { eventId, teamId, role, nickname }) {
      return new Promise((resolve, reject) => {
        let event;
        api.getEventById(eventId)
          .then(data => (event = { ...data, eventId }))
          .then(() => context.commit('invitations/setInvitationKeys', event.inviteKeys, { root: true }))
          .then(() => api.getCategoriesByEventId(eventId))
          .then((categories) => {
            if (categories.length > 0) {
              return categories;
            } else {
              return api.addPointCategory({
                pointValue: 1,
                pointFillColor: colorsUtils.appColors.red,
                categoryName: translator.t('general.defaultPointCategoryName'),
                pointStrokeColor: colorsUtils.appColors.black,
              }, eventId).then(category => [category]);
            }
          })
          .then(categories => (event.categories = categories))
          .then(() => {
            if (teamId) {
              return context.dispatch('team/downloadTeam', { eventId, teamId }, { root: true });
            } else {
              return context.dispatch('groups/downloadTeams', eventId, { root: true });
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
            context.commit('setEvent', { ...event, role, nickname });
            context.commit('setId', eventId);
            resolve(event);
          })
          .catch(reject);
      });
    },
    collectPoint (context, pointKey) {
      return new Promise((resolve, reject) => {
        api.collectPoint(context.getters.eventId, pointKey)
          .then((point) => {
            context.commit('updatePoint', point);
            context.commit('team/addCollectedPoint', point.pointId, { root: true });
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
