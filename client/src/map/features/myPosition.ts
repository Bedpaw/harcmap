import { createFeatureCommon } from 'map/factories/featureCommon';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { geolocationService } from 'config/geolocation-config';
import { createMyPositionFeature } from 'map/factories/myPositionFeature';
import { Map } from 'ol';
import { map } from 'map';

interface MyPositionFeature {
  destroyAll: () => void,
  trackSub: ({ unsubscribe: () => void; }) | null,
  layer?: Layer<Source>,
  create: (config: {latitude: number, longitude: number}) => false | undefined;
  trackPosition: (withPanTo?: boolean) => void
  stopTrackingPosition: () => void
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
  trackPosition (withPanTo = false): void {
    this.trackSub = geolocationService.subscribe((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(pos);
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
