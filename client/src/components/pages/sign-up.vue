<template>
  <t-page>
    <o-form
      :is-send="formSend"
      :on-submit="signUp"
    >
      <template #form>
        <m-field-email
          v-model="values.user"
          :disabled="blockForm"
        />
        <m-field-set-password
          v-model="values.password"
          :disabled="blockForm"
        />
        <m-field-text
          v-model.trim="values.userTeam"
          :label="$t('form.field.userTeam')"
          :rules="validationRules.userTeam"
          :disabled="blockForm"
          :assist="$t('form.assist.userTeam')"
        />
        <m-field-text
          v-model="values.eventId"
          :label="$t('form.field.eventId')"
          :rules="validationRules.eventId"
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
          <span class="f-bold">{{ values.user }}</span>
        </div>
        <a-button-primary @click="$router.push(ROUTES.signIn.path)">
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
import MFieldText from 'molecules/field/text';
import OForm from 'organisms/form';
import AButtonPrimary from 'atoms/button/primary';
import { api } from 'api';
import { reactive } from 'vue';
import { useForm } from 'plugins/form';

export default {
  name: 'p-sign-up',
  components: {
    TPage,
    AButtonPrimary,
    OForm,
    MFieldText,
    MFieldSetPassword,
    MFieldEmail,
    AButtonSubmit,
  },
  setup () {
    const values = reactive({
      user: '',
      password: '',
      userTeam: '',
      eventId: '',
    });

    const form = useForm();
    const { formSend, isSending, blockForm } = form;

    function onSignUp () {
      formSend.value = true;
      isSending.value = false;
      blockForm.value = false;
    }

    function signUp () {
      isSending.value = true;
      blockForm.value = true;
      api.signUp(values)
        .then(onSignUp)
        .catch(this.onErrorOccurs);
    }

    return {
      values,
      signUp,
      ...form,
    };
  },
};
</script>
