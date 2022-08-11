import OSM from 'ol/source/OSM';
import { GeoAccuracy } from 'utils/geolocation/geolocation-grade';

export const mapConfig = {
  // sources can be only source object prepared for TileLayer class
  sources: {
    light: new OSM(),
    dark: new OSM(),
  },
  settings: {
    lat: 0, // range from -90 to 90 degrees
    lon: 0, // range from -180 to 180 degrees
    zoom: 2,
    maxZoom: 17,
  },
  features: {
    defaultWidth: 3,
    defaultCollectedPointOpacity: 0.3,
    zIndex: 10,
  },
  lineConnectingPoints: {
    visible: true,
    color: '#008844',
    width: 4,
  },
  points: {
    collectedPointOpacity: 0.3,
    pointsVisibilityCondition: () => true,
    shapes: {
      // https://openlayers.org/en/latest/apidoc/module-ol_style_RegularShape-RegularShape.html
      point: {
        points: 20,
        radius: 10,
        angle: 20,
      },
      star: {
        points: 5,
        radius: 12,
        radius2: 4,
        angle: 0,
      },
    },
  },
  myPosition: {
    strokeColor: '#FFFFFF',
    strokeWidth: 2,
    isVisible: true,
    getFillColor: (accuracy: GeoAccuracy) =>
      [GeoAccuracy.HIGH, GeoAccuracy.MEDIUM].includes(accuracy) ? '#897AE7' : '#929292',
  },
};
