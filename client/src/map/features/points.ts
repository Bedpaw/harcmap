import { map } from 'map';
import { createFeatureCommon } from 'map/factories/featureCommon';
import { createPoints } from 'map/factories/pointsFeature';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { PointType } from 'models/point';
import Point from 'ol/geom/Point';
import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';

interface PointsFeature {
  destroyAll: () => void,
  layer?: Layer<Source>,
  create: (config: PointType[]) => false | undefined;
  removeByOlUid(olUid: string): void;
}

function getFeatures () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (points.layer as unknown as VectorLayer<VectorSource<Point>>).getSource().getFeatures();
}

function getFeatureByOlUid (olUid: string): Feature<Point> {
  const features = getFeatures();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return features.find(item => item.ol_uid === olUid);
}

export const points: PointsFeature = {
  layer: undefined,
  create: config => createFeatureCommon.createFeatureWrapper(
    config,
    createPoints,
    points,
  ),
  destroyAll () {
    if (!!map.realMap && !!points.layer) {
      (map.realMap as unknown as Map).removeLayer(points.layer);
    }
  },
  removeByOlUid (olUid: string) {
    const feature = getFeatureByOlUid(olUid);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (points.layer as unknown as VectorLayer<VectorSource<Point>>).getSource().removeFeature(feature);
  },
};
