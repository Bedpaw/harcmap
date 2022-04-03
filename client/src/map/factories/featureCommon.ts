import { map } from 'map';
import { ErrorMessage } from 'utils/error-message';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { mapConfig } from '../config';
import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { Map } from 'ol';

export const createFeatureCommon = {
  isMapNotDefined () {
    if (!map.realMap) {
      console.error(new ErrorMessage('Map is undefined'));
      return true;
    }
    return false;
  },

  createFeatureWrapper<T, R extends Geometry> (
    config: T, featureFactory: (config: T) => Feature<R>[] | false,
    featureObject: {
      destroyAll: () => void,
      layer?: Layer<Source>,
    },
  ) {
    /*
    * config -> arguments for featureFactory
    * featureFactory -> returns [new Feature()], if failure return false
    * featureObject -> store feature data and have props/func
    *   -> destroyAll() = remove layer
    *   -> layer = layer
    * */
    if (this.isMapNotDefined() || !featureFactory) {
      return false;
    }
    featureObject.destroyAll();

    const features = featureFactory(config);

    if (!features) {
      return false;
    }
    const layer = new VectorLayer({
      source: new VectorSource({ features }),
    });
    layer.setZIndex(mapConfig.features.zIndex);
    (map.realMap as unknown as Map).addLayer(layer);
    featureObject.layer = layer;
  },
};
