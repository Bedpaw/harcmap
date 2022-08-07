import Control, { Options } from 'ol/control/Control';
import { map } from 'map';
import { communicates } from 'src/utils/communicates';
import { GeolocationPositionResult, geolocationUtils } from 'utils/geolocation/geolocation';
import { GeoAccuracy } from 'utils/geolocation/geolocation-grade';

const locationIcons = {
  low: 'location_off',
  high: 'my_location',
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

    const container = document.createElement('div');
    container.className = 'geolocation-control-container ol-touch ol-unselectable ol-control f-hidden';

    container.appendChild(button);

    super({
      element: container,
      target: options.target,
    });

    button.addEventListener('click', this.showGeolocationGradeSnackbar.bind(this), false);
  }

  showGeolocationGradeSnackbar () {
    if (geolocationUtils.lastPosition === null) {
      communicates.showError('communicate.geolocation.blocked', true);
      return;
    }
    const {
      details: { lastAccuraciesGrade, accuracy },
      rawResult: { coords: { latitude, longitude } },
    } = geolocationUtils.lastPosition;

    switch (accuracy) {
      case GeoAccuracy.LOW:
        if (lastAccuraciesGrade === GeoAccuracy.UNKNOWN) {
          communicates.showMessageTemporary('communicate.geolocation.initialize', true);
        } else {
          communicates.showError('communicate.geolocation.inaccurate', true);
        }
        break;
      case GeoAccuracy.HIGH:
      case GeoAccuracy.MEDIUM:
        communicates.showSuccessTemporary('communicate.geolocation.success', true);
        map.panTo({ longitude, latitude });
        break;
    }
  }

  static getControl () : HTMLElement {
    // TODO Refactor condition
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

    if (button && icon) {
      switch (accuracy) {
        case GeoAccuracy.HIGH:
        case GeoAccuracy.MEDIUM:
          icon.innerText = locationIcons.high;
          break;
        case GeoAccuracy.LOW:
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

  static setGeolocationControlErrorColor () {
    const button = document.querySelector('.geolocation-control-button');
    const icon = button?.querySelector('i');
    if (button && icon) {
      icon.innerText = locationIcons.low;
      button.classList.add('low');
    }
  }
}
