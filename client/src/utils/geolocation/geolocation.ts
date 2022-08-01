import { gameRulesUtils } from 'utils/game-rules';
import { GeolocationAvailabilityOptions, Rules } from 'models/game-rules';
import { geolocationService } from 'config/geolocation-config';
import { store } from 'store';
import { GeoAccuracy, geolocationGrade } from 'utils/geolocation/geolocation-grade';
import { GeolocationControl } from 'map/controls/geolocation-control';

export interface GeolocationPositionResult {
  rawResult: GeolocationPosition;
  details: {
    accuracy: GeoAccuracy,
    lastPositionsAccuracies: GeoAccuracy[],
    lastAccuraciesGrade: GeoAccuracy,
  }
}

let trackSub: null | { unsubscribe: () => void } = null;

let lastPositionTime = 0;

function isValidResult () {
  // only one result per 2 seconds
  const now = Math.floor(Number(new Date()) / 1000);
  if (lastPositionTime === now || lastPositionTime === (now - 1)) {
    return false;
  }
  lastPositionTime = now;

  return true;
}

function trackPosition (
  successCallbacks: ((geolocationPositionResult: GeolocationPositionResult) => void)[],
  errorCallbacks: ((geolocationPositionResult: GeolocationPositionError) => void)[],
): void {
  if (gameRulesUtils.getRuleValueById(Rules.GeolocationAvailability) === GeolocationAvailabilityOptions.Forbidden) {
    // TODO handle it somehow in ui when game options ready
    console.warn('Geolocation not allowed');
    return;
  }

  if (trackSub) return;

  GeolocationControl.showButton();

  trackSub = geolocationService.subscribe((pos) => {

    if (!isValidResult()) {
      store.commit('addMapLog', 'skipped');
      return;
    }
    // TODO Check accuracy - remove after tests
    store.commit('addMapLog', `accuracy: ${pos.coords.accuracy.toFixed(2)}`);

    const accuracy = geolocationGrade.getAccuracyEnum(pos.coords.accuracy);

    geolocationGrade.addAccuracy(accuracy);

    const geolocationPositionResult: GeolocationPositionResult = {
      rawResult: pos,
      details: {
        accuracy,
        lastPositionsAccuracies: geolocationGrade.lastPositionsAccuracies,
        lastAccuraciesGrade: geolocationGrade.getLastAccuraciesGrade(),
      },
    };

    geolocationUtils.lastPosition = geolocationPositionResult;

    successCallbacks.forEach((cb) => cb(geolocationPositionResult));

  }, (error) => {
    store.commit('addMapLog', error.message);
    geolocationUtils.lastPosition = null;
    errorCallbacks.forEach((cb) => cb(error));
  });
}

function stopTrackingPosition () {
  if (trackSub) {
    geolocationGrade.lastPositionsAccuracies = [];
    GeolocationControl.hideButton();
    trackSub.unsubscribe();
    trackSub = null;
    lastPositionTime = 0;
  }
}

export const geolocationUtils = {
  trackPosition,
  stopTrackingPosition,
  lastPosition: {} as GeolocationPositionResult | null,
};
