import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Projection from 'ol/proj';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import { store } from 'store';
import { colorsUtils } from 'utils/colors';
import { PointType } from 'models/point';
import { PointCategoryAppearance, pointCategoryUtils } from 'utils/point-category';
import { mapConfig } from '../config';

export function createPoints (list: PointType[] = []) {
  const listOfFeatures = [];

  for (const point of list) {
    const lat = point.pointLatitude;
    const lon = point.pointLongitude;
    const appearance = pointCategoryUtils.getPointAppearance(point.pointCategoryId, point.pointType);
    const showCollected = shouldBeShownAsCollected(point);

    const stroke = getStroke(appearance, showCollected);
    const fill = getFill(appearance, showCollected);

    const position = Projection.fromLonLat([lon, lat] as number[]);

    const feature = new Feature({
      geometry: new Point(position),
    });

    feature.setStyle(getFinalPoints(appearance, fill, stroke));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    point.olUid = feature.ol_uid;
    listOfFeatures.push(feature);
  }
  store.commit('event/updateListOfPoints', list);

  return listOfFeatures;
}

const shouldBeShownAsCollected = (point: PointType) => store.getters['event/pointsDisplayedAsCollected']
  .find((pointFromList: PointType) => pointFromList.pointId === point.pointId);

const getStroke = (
  appearance: PointCategoryAppearance,
  isCollected: boolean,
  width = mapConfig.features.defaultWidth,
) => {
  return new Stroke({
    color: getColorWithOpacity(appearance.pointStrokeColor, isCollected),
    width,
  });
};

const getFill = (appearance: PointCategoryAppearance, isCollected: boolean) => {
  return new Fill({ color: getColorWithOpacity(appearance.pointFillColor, isCollected) });
};

const getColorWithOpacity = (color: string, isCollected: boolean) => {
  if (isCollected) {
    return colorsUtils.hexOrRGBToRGB(color, mapConfig.features.defaultCollectedPointOpacity);
  }
  return color;
};

const getFinalPoints = (appearance: PointCategoryAppearance, fill: Fill, stroke: Stroke) => {
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
