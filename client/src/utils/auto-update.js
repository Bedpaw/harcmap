import { map } from 'map';
import { ErrorMessage } from 'utils/error-message';
import { versionCompatibility } from 'utils/version-compatibility';
import { api } from 'api';
import { MACROS } from 'utils/macros';
import { getDate, timeUnitConversion } from 'utils/date';

const { msInMinute } = MACROS.time;
const { secondsToFull } = getDate;
const { msToSeconds } = timeUnitConversion;

let intervalID = null;
let timeoutID = null;

export const autoUpdate = {
  run () {
    timeoutID = setTimeout(() => {
      autoUpdate.once();
      intervalID = setInterval(
        autoUpdate.once,
        msInMinute);
    }, msToSeconds(secondsToFull()));
  },
  once () {
    api.information()
      .then(versionCompatibility.check)
      .then(map.updateMapFeatures)
      .catch(error => {
        // TODO: stop updating for no active app and update on change app state
        if (error instanceof ErrorMessage)
          console.log(error);
          // error.showMessage();
        else {
          // (new ErrorMessage(error)).showMessage();
        }
      });
  },
  stop () {
    clearTimeout(timeoutID);
    clearInterval(intervalID);
    timeoutID = null;
    intervalID = null;
  },
};
