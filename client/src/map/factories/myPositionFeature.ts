import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Projection from 'ol/proj';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import { mapConfig } from 'map/config';
import { GeoAccuracy } from 'utils/geolocation/geolocation-grade';
import { map } from 'map';

export const createMyPositionPointHelpers = {
  getCoords: (longitude: number, latitude: number) => Projection.fromLonLat([longitude, latitude]),
  getStyle: (accuracy: GeoAccuracy) => {
    const { strokeColor, strokeWidth, getFillColor } = mapConfig.myPosition;

    const stroke = new Stroke({
      color: strokeColor,
      width: strokeWidth,
    });

    const fill = new Fill({ color: getFillColor(accuracy) });

    const pointValues = {
      fill,
      stroke,
      ...mapConfig.points.shapes.point,
    };

    return new Style({
      image: new RegularShape(pointValues),
    });
  },
};

export function createMyPositionFeature (myPosition: { latitude: number, longitude: number, accuracy: GeoAccuracy }) {
  const { latitude, longitude, accuracy } = myPosition;

  const point = new Point(createMyPositionPointHelpers.getCoords(longitude, latitude));

  const feature = new Feature({
    geometry: point,
  });

  feature.setStyle(createMyPositionPointHelpers.getStyle(accuracy));

  map.myPosition.point = point;
  map.myPosition.featurePoint = feature;

  return [feature];
}
