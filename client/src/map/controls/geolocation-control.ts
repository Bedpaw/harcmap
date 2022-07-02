import Control, { Options } from 'ol/control/Control';
import { map } from 'map';
import { communicates } from 'src/utils/communicates';
import { GeolocationPositionResult, geolocationUtils } from 'utils/geolocation/geolocation';
import { GeoAccuracy } from 'utils/geolocation/geolocation-grade';

const locationIcons = {
  low: 'location_off',
  medium: 'not_listed_location',
  high: 'where_to_vote',
  unknown: 'location_searching',
};

export class GeolocationControl extends Control {

  constructor (optOptions: Options) {
    const options = optOptions || {};

    const button = document.createElement('button');

    button.className = 'geolocation-control-button';

    const icon = document.createElement('i');
    icon.innerText = locationIcons.unknown;
    icon.className = 'a-icon';
    button.appendChild(icon);

    const element = document.createElement('div');
    element.className = 'geolocation-control-container ol-touch ol-unselectable ol-control f-hidden';

    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.showGeolocationGradeSnackbar.bind(this), false);
  }

  showGeolocationGradeSnackbar () {
    const { details: { lastAccuraciesGrade, accuracy }, rawResult: { coords: { latitude, longitude } } } = geolocationUtils.lastPosition;

    switch (accuracy) {
      case GeoAccuracy.VERY_LOW:
      case GeoAccuracy.LOW:
        if (lastAccuraciesGrade === GeoAccuracy.UNKNOWN) {
          communicates.showMessageTemporary('Trwa inicjalizacja geolokalizacji');
        } else {
          communicates.showError('Wykryto problemy z geolokalizacją');
        }
        break;
      case GeoAccuracy.HIGH:
      case GeoAccuracy.MEDIUM:
        communicates.showSuccessTemporary('Geolokalizacja działa poprawnie!');
        map.panTo({ longitude, latitude });
        break;
    }
  }

  static getControl () : HTMLElement {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return map.realMap.getControls().getArray().find((instance: Control) => instance instanceof GeolocationControl).element;
  }

  static showButton () {
    GeolocationControl.getControl().classList.remove('f-hidden');
  }

  static hideButton () {
    GeolocationControl.getControl().classList.add('f-hidden');
  }

  static setGeolocationControlColor (geolocationDetails: GeolocationPositionResult) {
    const { details: { accuracy, lastAccuraciesGrade } } = geolocationDetails;
    const button = document.querySelector('.geolocation-control-button');
    const icon = button?.querySelector('i');

    button?.classList.remove('low');
    button?.classList.remove('high');
    button?.classList.remove('medium');

    if (button && icon) {
      switch (accuracy) {
        case GeoAccuracy.HIGH:
          button.classList.add('high');
          icon.innerText = locationIcons.high;
          break;
        case GeoAccuracy.MEDIUM:
          button.classList.add('medium');
          icon.innerText = locationIcons.medium;
          break;
        case GeoAccuracy.LOW:
        case GeoAccuracy.VERY_LOW:
          if (lastAccuraciesGrade === GeoAccuracy.UNKNOWN) {
            icon.innerText = locationIcons.unknown;
          } else {
            icon.innerText = locationIcons.low;
            button.classList.add('low');
          }
          break;
      }
    }

  }

}
