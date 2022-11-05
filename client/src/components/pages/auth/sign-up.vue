<template>
  <t-page>
    <o-form
      :is-send="formSend"
      :on-submit="signUp"
    >
      <template #form>
        <m-field-email
          v-model="values.email"
          :disabled="blockForm"
        />
        <m-field-set-password
          v-model="values.password"
          :disabled="blockForm"
        />
        <a-button-submit
          :disabled="blockForm"
          :is-sending="isSending"
        />
      </template>

      <template #response>
        <div class="f-py-2">
          <div class="f-pb-2 f-bold">
            {{ $t('page.signUp.registrationDone') }}
          </div>
          {{ $t('page.signUp.linkHasBeenSent') }}
          <span class="f-bold">{{ values.email }}</span>
        </div>
        <a-button-primary @click="goToSignIn()">
          {{ $t('form.button.goToLogin') }}
        </a-button-primary>
      </template>
    </o-form>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonSubmit from 'atoms/button/submit';
import MFieldEmail from 'molecules/field/email';
import MFieldSetPassword from 'molecules/field/set-password';
import OForm from 'organisms/form';
import AButtonPrimary from 'atoms/button/primary';
import { api } from 'api';
import { onMounted, reactive } from 'vue';
import { useForm } from 'plugins/form';
import { useRouter } from 'vue-router';
import { ROUTES } from 'config/routes-config';
import { urlUtils } from 'utils/url';

export default {
  name: 'p-sign-up',
  components: {
    TPage,
    AButtonPrimary,
    OForm,
    MFieldSetPassword,
    MFieldEmail,
    AButtonSubmit,
  },
  setup () {
    const values = reactive({
      email: '',
      password: '',
    });
    let invitationKey = '';

    const form = useForm();
    const { formSend, isSending, blockForm, onErrorOccurs } = form;

    function onSignUp () {
      formSend.value = true;
      isSending.value = false;
      blockForm.value = false;
    }

    function trimFields () {
      values.email = values.email.toLowerCase().trim();
      values.password = values.password.trim();
    }

    function signUp () {
      trimFields();
      isSending.value = true;
      blockForm.value = true;
      api.signUp({ ...values, invitationKey })
        .then(onSignUp)
        .catch(onErrorOccurs);
    }

    onMounted(() => {
      invitationKey = urlUtils.getInvitationKey();
    });

    const router = useRouter();
    function goToSignIn () {
      if (invitationKey) {
        router.push({
          name: ROUTES.signIn.name,
          query: { invitationKey },
        });
      } else
        router.push(ROUTES.signIn.path);

    }

    return {
      values,
      signUp,
      goToSignIn,
      ...form,
    };
  },
};
</script>
