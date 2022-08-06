import { store } from 'store';
import { translator } from 'src/dictionary';

function open (...params) {
  store.dispatch('snackbar/open', ...params);
}

function openTemporary (...params) {
  store.dispatch('snackbar/openTemporary', ...params);
}

function T (message, translationKey) {
  return translationKey ? translator.t(message) : message;
}

export const communicates = {
  showMessage (message, translationKey = false) {
    open({ message: T(message, translationKey) });
  },
  showSuccess (message, translationKey = false) {
    open({ message: T(message, translationKey), success: true });
  },
  showError (message, translationKey = false) {
    open({ message: T(message, translationKey), error: true });
  },
  showMessageTemporary (message, translationKey = false) {
    openTemporary({ message: T(message, translationKey) });
  },
  showSuccessTemporary (message, translationKey = false) {
    openTemporary({ message: T(message, translationKey), success: true });
  },
  showErrorTemporary (message, translationKey = false) {
    openTemporary({ message: T(message, translationKey), error: true });
  },
};
