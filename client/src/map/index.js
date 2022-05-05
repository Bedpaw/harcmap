import { createMap } from 'src/map/create';
import { ROUTES } from 'config/routes-config';
import { store } from 'store';
import router from 'src/router';
import { fromLonLat, toLonLat } from 'ol/proj';
import { uCheck } from '@dbetka/utils';
import { lines } from 'map/features/lines';
import { points } from 'map/features/points';
import { myPosition } from 'map/features/myPosition';

export const map = {
  realMap: null,
  points,
  lines,
  myPosition,
  create: config => createMap(map, config),
  destroy (elementId) {
    if (map.realMap) {
      map.realMap.setTarget(null);
      map.realMap = null;
      document.getElementById(elementId).firstChild?.remove();
    }
  },
  panTo ({ latitude, longitude, zoom }) {
    function panToView () {
      const view = map.realMap.getView();
      view.setCenter(fromLonLat([longitude, latitude]));
      view.setZoom(zoom);
    }

    const mapPosition = {
      mapLatitude: latitude,
      mapLongitude: longitude,
    };
    store.commit('event/setMapPosition', mapPosition);
    zoom && store.commit('event/setMapZoom', zoom);
    map.realMap !== null && panToView();
  },

  panToDefault () {
    const position = store.getters['event/mapDefaultPosition'];
    map.panTo({
      latitude: position.mapDefaultLatitude,
      longitude: position.mapDefaultLongitude,
      zoom: position.mapDefaultZoom,
    });
  },

  panToPointLocationOnMap ({ pointLatitude, pointLongitude }, config = { goToMap: true, zoom: 16 }) {
    map.panTo({
      latitude: pointLatitude,
      longitude: pointLongitude,
      zoom: config.zoom,
    });
    config.goToMap && router.push(ROUTES.map.path);
  },

  getMapPosition () {
    const mapView = map.realMap.getView();
    const [mapLongitude, mapLatitude] = toLonLat(mapView.getCenter());
    return {
      mapLongitude,
      mapLatitude,
      mapZoom: mapView.getZoom(),
    };
  },
  updateMapFeatures () {
    const eventId = store.getters['event/eventId'];
    const teamId = store.getters['team/teamId'];
    const role = store.getters['event/role'];
    const nickname = store.getters['event/role'];
    const promise = store.dispatch('event/download', { eventId, teamId, role, nickname });
    promise.then(() => {
      if (uCheck.isObject(map.realMap)) {
        map.points.create(store.getters['event/pointsVisibleOnMap']);
      }
    });
    return promise;

  },
};
