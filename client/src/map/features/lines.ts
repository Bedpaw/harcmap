import { map } from 'map';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { PointType } from 'models/point';
import { createFeatureCommon } from 'map/factories/featureCommon';
import { createLinesFeature } from 'map/factories/linesFeature';
import { Map } from 'ol';

interface LinesFeature {
  destroyAll: () => void,
  layer?: Layer<Source>,
  create: (config: PointType[]) => false | undefined;
}

export const lines: LinesFeature = {
  layer: undefined,
  create: (config: PointType[]) => createFeatureCommon.createFeatureWrapper(
    config,
    createLinesFeature,
    lines,
  ),
  destroyAll () {
    if (!!map.realMap && !!lines.layer)
      (map.realMap as unknown as Map).removeLayer(lines.layer.get('name'));

  },
};
