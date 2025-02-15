<template>
  <t-page>
    <div class="f-pt-1 f-pb-4">
      {{ $t('page.changePassword.content') }}
    </div>
    <o-form
      :is-send="formSend"
      :on-submit="changePassword"
    >
      <template #form>
        <m-field-set-password
          v-model="password"
          :disabled="blockForm"
          :labels="[$t('form.field.newPassword'), $t('form.field.reNewPassword')]"
        />
        <div
          class="f-text-center f-text-danger"
          v-text="message"
        />
        <a-button-submit
          :disabled="blockForm"
          :is-sending="isSending"
        />
      </template>

      <template #response>
        <div class="f-py-2 f-text-bold">
          {{ $t('communicate.changePassword.success') }}
        </div>
        <a-button-primary @click="router.push(ROUTES.signIn.path)">
          {{ $t('form.button.goToLogin') }}
        </a-button-primary>
      </template>
    </o-form>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonSubmit from 'atoms/button/submit';
import { api } from 'api';
import MFieldSetPassword from 'molecules/field/set-password';
import OForm from 'organisms/form';
import AButtonPrimary from 'atoms/button/primary';
import { useForm } from 'plugins/form';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ErrorMessage } from '@dbetka/wdk/lib/error-message';

export default {
  name: 'p-change-password',
  components: {
    TPage,
    AButtonPrimary,
    OForm,
    MFieldSetPassword,
    AButtonSubmit,
  },
  setup () {
    const password = ref('');
    const message = ref('');
    const form = useForm();
    const { formSend, isSending, blockForm, onErrorOccurs } = form;
    const router = useRouter();

    function onChangePassword () {
      formSend.value = true;
      isSending.value = false;
    }

    function changePassword () {
      isSending.value = true;
      blockForm.value = true;
      const key = router.currentRoute.value.params.key;
      if (key && typeof key === 'string') {
        api.changePassword(
          password.value,
          key,
        )
          .then(onChangePassword)
          .catch(onErrorOccurs);
      } else {
        const error = new ErrorMessage('error.changePasswordKeyIsWrong');
        error.showMessage();
        throw error;
      }
    }

    return {
      router,
      password,
      message,
      changePassword,
      ...form,
    };
  },
};
</script>
