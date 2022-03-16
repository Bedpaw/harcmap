<template>
  <t-page class="f-flex f-flex-col">
    <o-form :on-submit="signIn">
      <m-input
        v-model.trim="values.email"
        :disabled="blockForm"
        :placeholder="$t('form.field.email')"
        :tests-selector="testSelectors.inputs.email"
      />
      <m-input
        v-model="values.password"
        :disabled="blockForm"
        :placeholder="$t('form.field.password')"
        type="password"
        :tests-selector="testSelectors.inputs.password"
      />
      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
        :tests-selector="testSelectors.buttons.signInSubmit"
      />
    </o-form>
    <a-button-secondary
      :disabled="blockForm"
      @click="router.push(ROUTES.remindPassword.path)"
    >
      {{ ROUTES.remindPassword.label }}
    </a-button-secondary>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonSecondary from 'atoms/button/secondary';
import { ROUTES } from 'config/routes-config';
import { uPromise } from '@dbetka/utils';
import MInput from 'molecules/input';
import AButtonSubmit from 'atoms/button/submit';
import OForm from 'organisms/form';
import { DEV_USERS_LIST } from 'utils/dev-mode/auto-login';
import { onMounted, reactive } from 'vue';
import { useForm } from 'plugins/form';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { DEVELOPMENT_MODE } from 'config/app-env';
import { TEST_MODE } from 'src';
import { testSelectors } from 'data/selectors';

export default {
  name: 'p-sign-in',
  components: {
    AButtonSecondary,
    TPage,
    OForm,
    AButtonSubmit,
    MInput,
  },
  setup () {
    const store = useStore();
    const router = useRouter();
    const form = useForm();
    const { isSending, blockForm, onErrorOccurs } = form;

    const values = reactive({
      email: '',
      password: '',
    });

    function signIn () {
      isSending.value = true;
      blockForm.value = true;
      store.dispatch('user/signIn', values)
        .then(() => {
          isSending.value = false;
          blockForm.value = false;
        })
        .catch(onErrorOccurs);
    }
    function signInAutomatically () {
      isSending.value = true;
      blockForm.value = true;
      values.email = DEV_USERS_LIST.teamMember.email;
      values.password = DEV_USERS_LIST.teamMember.password;
      uPromise.timeout(500)
        .then(() => signIn());
    }

    onMounted(() => {
      if (DEVELOPMENT_MODE && !TEST_MODE()) {
        signInAutomatically();
      }
    });

    return {
      ...form,
      router,
      ROUTES,
      values,
      signIn,
      testSelectors,
    };
  },
};
</script>
