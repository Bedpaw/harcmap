import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Projection from 'ol/proj';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import { mapConfig } from 'map/config';
import { colorsUtils } from 'utils/colors';
import { GeoAccuracy } from "utils/geolocation/geolocation-grade";

export function createMyPositionFeature (myPosition: { latitude: number, longitude: number, accuracy: GeoAccuracy }) {
  const { latitude, longitude, accuracy } = myPosition;
  const { strokeColor, strokeWidth, fillColor, getOpacity } = mapConfig.myPosition;

  const stroke = new Stroke({
    color: strokeColor,
    width: strokeWidth,
  });

  const color = colorsUtils.hexOrRGBToRGB(fillColor, getOpacity(accuracy));
  const fill = new Fill({ color });

  const position = Projection.fromLonLat([longitude, latitude]);

  const feature = new Feature({
    geometry: new Point(position),
  });

  const pointValues = {
    fill,
    stroke,
    ...mapConfig.points.shapes.point,
  };

  feature.setStyle(
    new Style({
      image: new RegularShape(pointValues),
    }));
  return [feature];
}
