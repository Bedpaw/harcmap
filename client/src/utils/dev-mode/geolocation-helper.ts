import { GeoAccuracy } from "utils/geolocation/geolocation-grade";
import { GeolocationPositionResult } from "utils/geolocation/geolocation";

export const geolocationDevHelper = {
    consoleLogAccuracy
}
function consoleLogAccuracy(pos: GeolocationPositionResult) {
    console.log('0 - high, 1 - medium, 2 - low, 3 - very low');
    const print = (message: string) => console.log(message, Math.floor(pos.rawResult.coords.accuracy), pos.details.lastPositionsAccuracies);

    switch (pos.details.lastAccuraciesGrade) {
        case GeoAccuracy.HIGH:
        case GeoAccuracy.MEDIUM:
            print('GOOD ACCURACY!')
            break;
        case GeoAccuracy.LOW:
        case GeoAccuracy.VERY_LOW:
            print('BAD ACCURACY!')
            break;
        case GeoAccuracy.UNKNOWN:
            print('UNKNOWN ACCURACY');
            break;
    }
}
