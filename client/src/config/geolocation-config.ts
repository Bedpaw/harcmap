import { GeolocationService } from '@dbetka/wdk/lib/geolocation';

export const geolocationService = new GeolocationService({
  defaultPositionOptions: {
    maximumAge: 1000,
    enableHighAccuracy: false,
  },
});
