import { translator } from 'src/dictionary';
import { communicates } from 'utils/communicates';
import { ref } from 'vue';
import { ErrorMessage } from '@dbetka/wdk/lib/error-message';
import { ROUTES } from 'config/routes-config';
import { validationRules } from 'plugins/validation/rules';

export function useForm () {
  const blockForm = ref(false);
  const isSending = ref(false);
  const formSend = ref(false);
  const isServerError = ref(false);

  function showSuccessMessage (message:string = translator.t('general.saved')) {
    communicates.showSuccessTemporary(message);
  }

  function onSuccessOccurs (message:string | null = translator.t('general.saved')) {
    isServerError.value = false;
    isSending.value = false;
    blockForm.value = false;
    if (message === null)
      return;

    showSuccessMessage(message);
  }

  function onErrorOccurs (errorMessage: ErrorMessage) {
    isServerError.value = true;
    isSending.value = false;
    blockForm.value = false;
    errorMessage.showMessageTemporary();
  }

  return {
    blockForm,
    isSending,
    formSend,
    isServerError,
    onSuccessOccurs,
    onErrorOccurs,
    ROUTES,
    validationRules,
  };
}
