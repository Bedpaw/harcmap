<template>
  <t-page class="f-flex f-flex-col">
    <o-form :on-submit="signIn">
      <m-input
        :disabled="blockForm"
        :placeholder="$t('form.field.email')"
        v-model.trim="values.user"
      />
      <m-input
        :disabled="blockForm"
        :placeholder="$t('form.field.password')"
        type="password"
        v-model="values.password"
      />
      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
      />
    </o-form>
    <a-button-secondary
      @click="router.push(ROUTES.remindPassword.path)"
      :disabled="blockForm"
    >
      {{ ROUTES.remindPassword.label }}
    </a-button-secondary>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonSecondary from 'atoms/button/secondary';
import { api } from 'api';
import { ROUTES } from 'config/routes-config';
import { uPromise } from '@dbetka/utils';
import MInput from 'molecules/input';
import AButtonSubmit from 'atoms/button/submit';
import OForm from 'organisms/form';
import { ERRORS } from 'utils/macros/errors';
import { ErrorMessage } from 'utils/error-message';
import { DEV_USERS_LIST } from 'utils/dev-mode/auto-login';
import { onMounted, reactive } from 'vue';
import { useForm } from 'plugins/form';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

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
      user: '',
      password: '',
    });

    function onSignIn (data) {
      store.dispatch('user/signIn', data)
        .then(() => {
          store.getters['user/firstLogin'] && store.commit('guide/open');
          router.push(ROUTES.eventsList.path);
          isSending.value = false;
          blockForm.value = false;
        })
        .catch(() => onErrorOccurs(new ErrorMessage(ERRORS.dataAfterSignIn, { hard: true })));
    }
    function signIn () {
      isSending.value = true;
      blockForm.value = true;
      api.signIn(values)
        .then(onSignIn)
        .catch(onErrorOccurs);
    }
    function signInAutomatically () {
      isSending.value = true;
      blockForm.value = true;
      values.user = DEV_USERS_LIST.common.user;
      values.password = DEV_USERS_LIST.common.password;
      uPromise.timeout(500)
        .then(() => signIn());
    }

    onMounted(() => {
      if (PRODUCTION === false) {
        signInAutomatically();
      }
    });

    return {
      ...form,
      router,
      ROUTES,
      values,
      signIn,
    };
  },
};
</script>
