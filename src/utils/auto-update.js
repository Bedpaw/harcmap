import { map } from 'map';
import { ErrorMessage } from 'utils/error-message';
import { versionCompatibility } from 'utils/version-compatibility';
import { MACROS } from 'utils/macros';
import { getSecondsToFullMinute } from 'utils/date';

const { msInMinute } = MACROS.time;

let intervalID = null;
let timeoutID = null;

export const autoUpdate = {
  run () {
    timeoutID = setTimeout(() => {
      autoUpdate.once();
      intervalID = setInterval(
        autoUpdate.once,
        msInMinute);
    }, getSecondsToFullMinute({ inMs: true }));
  },
  once () {
    api.information()
      .then(versionCompatibility.check)
      .then(map.updateMapFeatures)
      .catch(error => {
        if (error instanceof ErrorMessage) {
          error.showMessage();
        } else {
          (new ErrorMessage(error)).showMessage();
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
