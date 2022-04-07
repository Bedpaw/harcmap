import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { Stroke, Style } from 'ol/style';

import { PointType } from 'models/point';
import { mapConfig } from '../config';

export function createLinesFeature (list: PointType[] = []): Feature<LineString>[] | false {
  const notEnoughPoints = list.length < 2;
  if (!mapConfig.lineConnectingPoints.visible) return false;
  if (notEnoughPoints) return false;

  const linePath = list.map(point => [point.pointLongitude, point.pointLatitude]) as number[][];
  const polyline = new LineString(linePath);
  polyline.transform('EPSG:4326', 'EPSG:3857');

  const feature = new Feature(polyline);
  feature.setStyle(getLineStyle());

  return [feature];
}

const getLineStyle = () => {
  return new Style({
    stroke: new Stroke(
      {
        color: mapConfig.lineConnectingPoints.color,
        width: mapConfig.lineConnectingPoints.width,
      },
    ),
  });
};
