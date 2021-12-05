import { API_ERRORS, API_WARNS } from 'utils/macros/errors';
import validateCodes from 'validateCodes';
import { store } from 'store';
import router from 'src/router';
import { ROUTES } from 'config/routes-config';
import { translator } from 'src/dictionary';
import { ErrorMessage } from 'utils/error-message';
import { WarnMessage } from 'utils/warn-message';
import { HttpService } from '@dbetka/wdk/lib/http-service';
import { API_URL } from 'config/app-env';

export const httpService = HttpService.getInstance({
  apiUrl: API_URL + '/api/v1',
  defaultRequestConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  earlyCatchStrategy: false,
  defaultErrorConfig: {
    defaultError: API_ERRORS.undefined.defaultError,
    errors: API_ERRORS,
  },
  defaultWarnConfig: {
    defaultWarn: API_WARNS.undefined.defaultWarn,
    warns: API_WARNS,
  },
  defaultSuccessCallback: (data) => data,
  defaultErrorCallback: (error, defaultOptions, customOptions) => {
    const { defaultError, errors } = customOptions;
    let errorMessage = defaultError;
    if (errors) {
      for (const [codes, message] of errors) {
        for (const singleCode of codes) {
          if (error === singleCode) {
            errorMessage = message;
            break;
          }
        }
      }
    }

    if (error === validateCodes.NO_PERMISSION_TO_RESOURCE) {
      store.commit('user/signOut');
      router.push(ROUTES.welcome.path);
      errorMessage = translator.t('apiError.general.unauthorizedAccess');
    }
    return new ErrorMessage(errorMessage, { code: error });
  },
  connectionErrorCallback: () => {
    return new ErrorMessage(translator.t('apiError.general.notOnline'));
  },
  defaultWarnCallback: (warn, defaultWarn, warns) => {
    let warnMessage = defaultWarn;
    if (warns) {
      for (const [codes, message] of warns) {
        for (const singleCode of codes) {
          if (warn === singleCode) {
            warnMessage = message;
            break;
          }
        }
      }
      (new WarnMessage(warnMessage)).showMessage();
    }
  },

});
