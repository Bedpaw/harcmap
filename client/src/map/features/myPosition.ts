import { createFeatureCommon } from 'map/factories/featureCommon';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { geolocationService } from 'config/geolocation-config';
import { createMyPositionFeature } from 'map/factories/myPositionFeature';
import { Map } from 'ol';
import { map } from 'map';
import { PointType } from 'models/point';

import { GeolocationAvailabilityOptions, Rules } from 'models/game-rules';
import { gameRulesUtils } from 'utils/game-rules';

interface MyPositionFeature {
  destroyAll: () => void,
  trackSub: ({ unsubscribe: () => void; }) | null,
  layer?: Layer<Source>,
  create: (config: {latitude: number, longitude: number}) => false | undefined;
  trackPosition: (withPanTo?: boolean) => void
  stopTrackingPosition: () => void
}
/**
 * Return distance in meters
 * */
function getDistanceBetweenTwoCoords (mk1: {latitude: number, longitude: number}, mk2: {latitude: number, longitude: number}) {
  // https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
  const R = 6371.0710; // Radius of the Earth in miles
  const rlat1 = mk1.latitude * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = mk2.latitude * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (mk2.longitude - mk1.longitude) * (Math.PI / 180); // Radian difference (longitudes)

  const d = 1000 * 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return d;
}

function getDistanceToClosestPoint (points: PointType[], currentPosition: { longitude: number, latitude: number }) {
  const distancesToPoints = points.map(point => {
    const distanceBetween = getDistanceBetweenTwoCoords(
      { latitude: currentPosition.latitude, longitude: currentPosition.longitude },
      { latitude: point.pointLatitude, longitude: point.pointLongitude },
    );
    return Math.round(distanceBetween);
  });
  const minDistance = Math.min(...distancesToPoints);

  console.log(distancesToPoints, minDistance);

  return minDistance;
}

let intervalId: ReturnType<typeof setTimeout>;

function setStylesIfCloseToPoint (minDistanceToPoint: number) {
  // const element = document.getElementById('o-map')
  const element = document.getElementsByClassName('m-banner-timer')[0] as HTMLElement;

  if (intervalId) {
    clearInterval(intervalId);
  }

  if (element) {
    const setBorder = (color: string) => {
      element.style.border = `4px solid ${color}`;
    };
    const clearBorder = () => {
      element.style.border = 'none';
    };
    const conditionCheck = () => element.style.border === 'none';

    const handleInterval = (conditionCheck: () => boolean, success: () => void, failure: () => void) => {
      intervalId = setInterval(() => {
        conditionCheck() ? success() : failure();
      }, 1000);
    };
    if (minDistanceToPoint < 25) {
      handleInterval(conditionCheck, () => setBorder('red'), clearBorder);
    } else if (minDistanceToPoint < 50) {
      handleInterval(conditionCheck, () => setBorder('yellow'), clearBorder);
    } else if (minDistanceToPoint < 100) {
      handleInterval(conditionCheck, () => setBorder('green'), clearBorder);

    }
  }
}

export const myPosition: MyPositionFeature = {
  trackSub: null,
  layer: undefined,
  create: config => createFeatureCommon.createFeatureWrapper(
    config,
    createMyPositionFeature,
    myPosition,
  ),
  destroyAll () {
    if (!!map.realMap && !!myPosition.layer) {
      (map.realMap as unknown as Map).removeLayer(myPosition.layer);
    }
  },
  trackPosition (withPanTo = false, points: PointType[] = []): void {
    if (gameRulesUtils.getRuleValueById(Rules.GeolocationAvailability) === GeolocationAvailabilityOptions.Forbidden) {
      console.warn('Geolocation not allowed');
      return;
    }
    this.trackSub = geolocationService.subscribe((pos) => {
      const { latitude, longitude } = pos.coords;

      // Check accuracy
      console.log('accuracy: ', pos.coords.accuracy);
      if (pos.coords.accuracy > 25) {
        console.warn('Accuracy is too low, cannot handle position');
        // should return
      }
      const minDistanceToPoint = getDistanceToClosestPoint(points, { latitude, longitude });

      setStylesIfCloseToPoint(minDistanceToPoint);

      if (withPanTo) {
        map.panTo({ latitude, longitude, zoom: 15 });
      }
      map.myPosition.create({
        latitude,
        longitude,
      });
    });
  },
  stopTrackingPosition () {
    if (this.trackSub) {
      this.trackSub.unsubscribe();
    }
  },
};
