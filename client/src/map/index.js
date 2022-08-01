import { createMap } from 'src/map/create';
import { ROUTES } from 'config/routes-config';
import { store } from 'store';
import router from 'src/router';
import { fromLonLat, toLonLat } from 'ol/proj';
import { uCheck } from '@dbetka/utils';
import { lines } from 'map/features/lines';
import { points } from 'map/features/points';
import { myPosition } from 'map/features/myPosition';
import { featureToggles } from 'utils/dev-mode/feature-toggle';
import { appStorage } from 'utils/storage';
import { geolocationUtils } from '../utils/geolocation/geolocation';
import { GeolocationControl } from './controls/geolocation-control';
import { geolocationDevHelper } from '../utils/dev-mode/geolocation-helper';

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
      document.getElementById(elementId)?.firstChild?.remove();
    }
  },
  panTo ({ latitude, longitude, zoom = 16 }) {
    function panToView () {
      const view = map.realMap.getView();
      view.setCenter(fromLonLat([longitude, latitude]));
      if (view.getZoom() < zoom) {
        view.setZoom(zoom);
      }
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
  createMapFeatures () {
    const pointList = store.getters['event/pointsVisibleOnMap'];
    const pointsCollectedByUser = store.getters['team/collectedPoints'];

    geolocationUtils.trackPosition(
      [
        map.myPosition.draw,
        geolocationDevHelper.consoleLogAccuracy,
        GeolocationControl.setGeolocationControlColor,
      ],
      [
        map.myPosition.destroyAll,
        GeolocationControl.setGeolocationControlErrorColor,
      ],
    );

    map.points.create(pointList);
    map.lines.create(pointsCollectedByUser);
  },
  refreshMap () {
    map.destroyMapWithFeatures();
    map.createMapWithFeatures();
  },
  createMapWithFeatures () {
    const event = store.getters['event/event'];
    map.create({
      elementId: 'o-map',
      lat: event.mapLatitude,
      lon: event.mapLongitude,
      zoom: event.mapZoom,
    });

    this.createMapFeatures();

    // Map popup have to define after map creating.\
    const mapPopup = store.getters['mapPopup/popupReference'];
    mapPopup && mapPopup.definePopup();

    map.realMap.on('moveend', this.saveLastMapPositionToStorage);
  },
  destroyMapWithFeatures () {
    if (map.realMap) {
      map.realMap.un('moveend', this.saveLastMapPositionToStorage);
    }
    geolocationUtils.stopTrackingPosition();
    myPosition.destroyAll();
    map.destroy('o-map');
  },
  saveLastMapPositionToStorage () {
    const mapView = map.realMap.getView();
    const [mapLongitude, mapLatitude] = toLonLat(mapView.getCenter());
    const mapZoom = mapView.getZoom();

    store.commit('event/setMapPosition', {
      mapLatitude,
      mapLongitude,
    });
    store.commit('event/setMapZoom', mapZoom);

    const dataForStorage = {
      mapLatitude,
      mapLongitude,
      mapZoom,
    };
    appStorage.setItem(appStorage.appKeys.mapPosition, dataForStorage, appStorage.getIds.eventIdAndEmail());
  },
};
