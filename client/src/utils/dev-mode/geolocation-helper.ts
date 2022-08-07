import { GeoAccuracy } from 'utils/geolocation/geolocation-grade';
import { GeolocationPositionResult } from 'utils/geolocation/geolocation';

export const geolocationDevHelper = {
  consoleLogAccuracy,
};
function consoleLogAccuracy (pos: GeolocationPositionResult) {
  const print = (message: string) => console.log(message, Math.floor(pos.rawResult.coords.accuracy), pos.details.lastPositionsAccuracies);

  switch (pos.details.lastAccuraciesGrade) {
    case GeoAccuracy.HIGH:
    case GeoAccuracy.MEDIUM:
      print('HIGH ACCURACY!');
      break;
    case GeoAccuracy.LOW:
      print('LOW ACCURACY!');
      break;
    case GeoAccuracy.UNKNOWN:
      print('UNKNOWN ACCURACY');
      break;
  }
}
