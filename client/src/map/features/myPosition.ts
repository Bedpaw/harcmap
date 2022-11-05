import { createFeatureCommon } from 'map/factories/featureCommon';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { createMyPositionFeature, createMyPositionPointHelpers } from 'map/factories/myPositionFeature';
import { Map } from 'ol';
import { map } from 'map';
import { GeoAccuracy } from 'utils/geolocation/geolocation-grade';
import { GeolocationPositionResult } from 'utils/geolocation/geolocation';
import { mapConfig } from 'map/config';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

interface MyPositionFeature {
  destroyAll: () => void,
  layer?: Layer<Source>,
  create: (config: { latitude: number, longitude: number, accuracy: GeoAccuracy }) => false | undefined;
  draw: (position: GeolocationPositionResult) => void;
  point: null | Point
  featurePoint: null | Feature<Point>
}

function draw (positionResult: GeolocationPositionResult) {
  if (mapConfig.myPosition.isVisible === false)
    return;

  const {
    details: { lastAccuraciesGrade, accuracy },
    rawResult: { coords: { latitude, longitude } },
  } = positionResult;

  switch (lastAccuraciesGrade) {
    case GeoAccuracy.UNKNOWN:
    case GeoAccuracy.MEDIUM:
    case GeoAccuracy.HIGH:
      map.myPosition.create({
        latitude,
        longitude,
        accuracy,
      });
      break;
    case GeoAccuracy.LOW:
      map.myPosition.destroyAll();
      break;
  }
}

export const myPosition: MyPositionFeature = {
  layer: undefined,
  create: (config) => {
    if (map.myPosition.point && map.myPosition.featurePoint) {
      const { longitude, latitude, accuracy } = config;

      map.myPosition.point.setCoordinates(createMyPositionPointHelpers.getCoords(longitude, latitude));
      map.myPosition.featurePoint.setStyle(createMyPositionPointHelpers.getStyle(accuracy));

    } else {
      return createFeatureCommon.createFeatureWrapper(
        config,
        createMyPositionFeature,
        myPosition,
      );
    }
  },
  draw,
  point: null,
  featurePoint: null,
  destroyAll () {
    if (!!map.realMap && !!myPosition.layer) {
      myPosition.point = null;
      myPosition.featurePoint = null;
      (map.realMap as unknown as Map).removeLayer(myPosition.layer);
    }
  },
};
