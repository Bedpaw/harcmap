import { createFeatureCommon } from 'map/factories/featureCommon';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { createMyPositionFeature } from 'map/factories/myPositionFeature';
import { Map } from 'ol';
import { map } from 'map';
import { GeoAccuracy } from "utils/geolocation/geolocation-grade";
import { GeolocationPositionResult } from "utils/geolocation/geolocation";
import {mapConfig} from "map/config";

interface MyPositionFeature {
  destroyAll: () => void,
  layer?: Layer<Source>,
  create: (config: { latitude: number, longitude: number, accuracy: GeoAccuracy }) => false | undefined;
  draw: (position: GeolocationPositionResult) => void;
}

function draw (positionResult: GeolocationPositionResult) {
  if (mapConfig.myPosition.isVisible === false) {
    return;
  }
  const {
    details: {
      lastAccuraciesGrade,
      accuracy,
    },
    rawResult: {
        coords: {
          latitude,
          longitude,
        },
    },
  } = positionResult

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
    case GeoAccuracy.VERY_LOW:
      map.myPosition.destroyAll();
      break;
  }
}

export const myPosition: MyPositionFeature = {
  layer: undefined,
  create: config => createFeatureCommon.createFeatureWrapper(
    config,
    createMyPositionFeature,
    myPosition,
  ),
  draw,
  destroyAll () {
    if (!!map.realMap && !!myPosition.layer) {
      (map.realMap as unknown as Map).removeLayer(myPosition.layer);
    }
  },
};
