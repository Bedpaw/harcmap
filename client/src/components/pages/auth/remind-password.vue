<template>
  <t-page>
    <div class="f-pt-1 f-pb-4">
      {{ $t('page.remindPassword.content') }}
    </div>
    <o-form
      :is-send="formSend"
      :on-submit="remindPassword"
    >
      <template #form>
        <m-field-email
          v-model="email"
          :disabled="blockForm"
        />
        <a-button-submit
          :disabled="blockForm"
          :is-sending="isSending"
        />
      </template>

      <template #response>
        <div class="f-py-2 f-text-bold">
          {{ $t('page.remindPassword.success') }}
        </div>
        <a-button-primary @click="router.push(ROUTES.welcome.path)">
          {{ $t('general.backToStart') }}
        </a-button-primary>
      </template>
    </o-form>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonSubmit from 'atoms/button/submit';
import OForm from 'organisms/form';
import MFieldEmail from 'molecules/field/email';
import AButtonPrimary from 'atoms/button/primary';
import { api } from 'api';
import { ref } from 'vue';
import { useForm } from 'plugins/form';
import { useRouter } from 'vue-router';

export default {
  name: 'p-remind-password',
  components: {
    TPage,
    AButtonPrimary,
    MFieldEmail,
    OForm,
    AButtonSubmit,
  },
  setup () {
    const email = ref('');
    const form = useForm();
    const { formSend, isSending, blockForm, onErrorOccurs } = form;
    const router = useRouter();

    function onRemindPassword () {
      formSend.value = true;
      isSending.value = false;
    }

    function remindPassword () {
      isSending.value = true;
      blockForm.value = true;
      api.sendResetPassword({ email: email.value })
        .then(onRemindPassword)
        .catch(onErrorOccurs);
    }

    return {
      ...form,
      router,
      email,
      remindPassword,
    };
  },
};
</script>
