import { ErrorMessage } from 'utils/error-message';
import { ERRORS } from 'utils/macros/errors';
import { logical } from 'vendors/logical';

/**
 * @param errors - example:
 *   errors: [
 *     [validateCodes.DATABASE_DATA_CONFLICT_ERROR, ERRORS.pointIsCollected],
 *     [validateCodes.DATABASE_NO_RESULT_ERROR, ERRORS.pointNotExists],
 *   ],
 */
export const apiResponseService = {
  takeOverResponse ({
    data,
    resolve = requireMethod('success'),
    reject = requireMethod('reject'),
    errors = [],
    defaultError = ERRORS.undefinedError,
  }) {
    if (this.hasNoError(data)) {
      resolve();
    } else {
      catchError({
        data,
        reject,
        errors,
        defaultError,
      });
    }
  },
  catchConnectionError (reject) {
    return function (fetchError) {
      reject(new ErrorMessage(fetchError));
    };
  },
  hasNoError (data) {
    return logical.isNull(data.error);
  },
};

function requireMethod (methodName) {
  return () => {
    throw new Error(methodName + ' method required');
  };
}

function catchError ({ data, errors = {}, reject, defaultError }) {
  let errorMessage = defaultError;
  for (const [code, message] of errors) {
    if (data.error === code) {
      errorMessage = message;
      break;
    }
  }
  reject(new ErrorMessage(errorMessage));
}
