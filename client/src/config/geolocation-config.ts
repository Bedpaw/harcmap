import { GeolocationService } from '@dbetka/wdk/lib/geolocation';
import { featureToggles } from 'utils/dev-mode/feature-toggle';

export const geolocationService = new GeolocationService({
  defaultPositionOptions: {
    maximumAge: 1000,
    enableHighAccuracy: !featureToggles.FEATURE_TOGGLE_HIGH_ACCURACY(),
  },
});
