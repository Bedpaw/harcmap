import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as Projection from 'ol/proj';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import { mapConfig } from 'map/config';

export function createMyPositionFeature (myPosition: { latitude: number, longitude: number }) {
  const { latitude, longitude } = myPosition;
  const { strokeColor, strokeWidth, fillColor } = mapConfig.myPosition;
  const stroke = new Stroke({
    color: strokeColor,
    width: strokeWidth,
  });
  const fill = new Fill({ color: fillColor });

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
