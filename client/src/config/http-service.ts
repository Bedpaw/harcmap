import { API_ERRORS } from 'utils/macros/errors';
import validateCodes from 'validateCodes';
import { store } from 'store';
import router from 'src/router';
import { ROUTES } from 'config/routes-config';
import { translator } from 'src/dictionary';
import { ErrorMessage } from 'utils/error-message';
import { HttpService } from '@dbetka/wdk/lib/http-service';
import { API_URL } from 'config/app-env';
import { ApiError, ServerError } from 'models/errors';

export const httpService = HttpService.createInstance<ApiError, ServerError>({
  apiUrl: API_URL + '/api/v1',
  defaultRequestConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  defaultErrorCallback: (serverError, options) => {
    console.log(serverError, options);
    const { defaultError, errors } = options;
    let errorMessage = defaultError ?? API_ERRORS.undefined.defaultError;
    if (errors) {
      for (const [codes, message] of errors) {
        for (const singleCode of codes) {
          if (serverError.error === singleCode) {
            errorMessage = message;
            break;
          }
        }
      }
    }
    if (serverError.error === validateCodes.NO_PERMISSION_TO_RESOURCE) {
      store.commit('user/signOut');
      router.push(ROUTES.welcome.path);
      errorMessage = translator.t('apiError.general.unauthorizedAccess');
    }
    return new ErrorMessage(errorMessage, { code: serverError.error });
  },
  connectionErrorCallback: () => {
    return new ErrorMessage(translator.t('apiError.general.notOnline'));
  },
});
