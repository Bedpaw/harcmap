import { PointType } from 'models/point';

/**
 * Return distance in meters
 * Based on: https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
 * For full version better use openLayers: https://stackoverflow.com/questions/10109620/openlayers-how-to-calculate-distance-between-two-points
 * */
function getDistanceBetweenTwoCoords (mk1: {latitude: number, longitude: number}, mk2: {latitude: number, longitude: number}) {
  const R = 6371.0710; // Radius of the Earth in miles
  const rlat1 = mk1.latitude * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = mk2.latitude * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (mk2.longitude - mk1.longitude) * (Math.PI / 180); // Radian difference (longitudes)

  const d = 1000 * 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return d;
}

function getDistanceToClosestPoint (points: PointType[], currentPosition: { longitude: number, latitude: number }) {
  const distancesToPoints = points.map(point => {
    const distanceBetween = getDistanceBetweenTwoCoords(
      { latitude: currentPosition.latitude, longitude: currentPosition.longitude },
      { latitude: point.pointLatitude, longitude: point.pointLongitude },
    );
    return Math.round(distanceBetween);
  });
  return Math.min(...distancesToPoints);
}

export const geolocationCalculation = {
  getDistanceBetweenTwoCoords,
  getDistanceToClosestPoint,
};
