import { gameRulesUtils } from 'utils/game-rules';
import { GeolocationAvailabilityOptions, Rules } from 'models/game-rules';
import { geolocationService } from 'config/geolocation-config';
import { store } from 'store';
import { GeoAccuracy, geolocationGrade } from "utils/geolocation/geolocation-grade";
import { GeolocationControl } from "map/controls/geolocation-control";

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
  // only one result per second
  const now = Number(new Date());

  if (lastPositionTime === now) {
    return false;
  }

  lastPositionTime = now;

  return true;
}

function trackPosition (callbacks: ((geolocationPositionResult: GeolocationPositionResult) => void)[]): void {
  if (gameRulesUtils.getRuleValueById(Rules.GeolocationAvailability) === GeolocationAvailabilityOptions.Forbidden) {
    // TODO handle it somehow in ui
    console.warn('Geolocation not allowed');
    return;
  }

  if (trackSub) {
    return;
  }

  GeolocationControl.showButton();

  trackSub = geolocationService.subscribe((pos) => {
    if (!isValidResult()) {
      store.commit('addMapLog', 'skipped');
      return;
    }
    // TODO Check accuracy - remove after tests
    store.commit('addMapLog', `accuracy: ${pos.coords.accuracy}`);

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

    geolocationUtils.lastPosition = geolocationPositionResult

    callbacks.forEach((cb) => cb(geolocationPositionResult));

  }, (error) => {
    store.commit('addMapLog', error.message);
  });
}

function stopTrackingPosition () {
  if (trackSub) {
    geolocationGrade.lastPositionsAccuracies = [];
    GeolocationControl.hideButton();
    trackSub.unsubscribe();
  }
}

export const geolocationUtils = {
  trackPosition,
  stopTrackingPosition,
  lastPosition: {} as GeolocationPositionResult,
};
