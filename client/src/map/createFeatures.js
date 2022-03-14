import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Projection from 'ol/proj';
import { map } from 'src/map';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import { store } from 'store';
import { uCheck } from '@dbetka/utils';
import { mapConfig } from 'map/config';
import { colorsUtils } from 'utils/colors';
import { ErrorMessage } from 'utils/error-message';
import { pointCategoryUtils } from 'utils/point-category';

export function createFeatures ({ list = [] }) {
  const mapIsNotDefined = uCheck.isNotObject(map.realMap);
  const listOfFeatures = [];

  if (mapIsNotDefined) {
    console.error(new ErrorMessage('Map is undefined'));
    return false;
  }

  map.points.destroyAll();

  for (const point of list) {
    const lat = point.pointLatitude;
    const lon = point.pointLongitude;
    const appearance = pointCategoryUtils.getPointAppearance(point.pointCategoryId, point.pointType);
    const showCollected = shouldBeShownAsCollected(point);

    const stroke = getStroke(appearance, showCollected);
    const fill = getFill(appearance, showCollected);

    const position = Projection.fromLonLat([lon, lat]);

    const feature = new Feature({
      geometry: new Point(position),
    });
    feature.setStyle(getFinalPoints(appearance, fill, stroke));

    point.olUid = feature.ol_uid;
    listOfFeatures.push(feature);
  }
  store.commit('event/updateListOfPoints', list);

  const layer = new VectorLayer({
    source: new VectorSource({
      features: listOfFeatures,
    }),
  });
  layer.setZIndex(mapConfig.features.zIndex);
  map.realMap.addLayer(layer);
  map.points.layer = layer;
}

const shouldBeShownAsCollected = (point) => store.getters['event/pointsDisplayedAsCollected']
  .find(pointFromList => pointFromList.pointId === point.pointId);

const getStroke = (appearance, isCollected, width = mapConfig.features.defaultWidth) => {
  return new Stroke({
    color: getColorWithOpacity(appearance.pointStrokeColor, isCollected),
    width,
  });
};

const getFill = (appearance, isCollected) => {
  return new Fill({ color: getColorWithOpacity(appearance.pointFillColor, isCollected) });
};

const getColorWithOpacity = (color, isCollected) => {
  if (isCollected) {
    return colorsUtils.hexOrRGBToRGB(color, mapConfig.features.defaultCollectedPointOpacity);
  }
  return color;
};

const getFinalPoints = (appearance, fill, stroke) => {
  const pointValues = {
    fill,
    stroke,
    points: 20,
    radius: 10,
    angle: 20,
  };
  if (appearance.shape === pointCategoryUtils.availableShapes.star) {
    Object.assign(pointValues, {
      points: 5,
      radius: 12,
      radius2: 4,
      angle: 0,
    });
  }
  return new Style({
    image: new RegularShape(pointValues),
  });
};
