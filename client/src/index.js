import { createApp } from 'vue';
import i18n from './dictionary';
import router from './router';
import { store } from 'store';
import { ACCOUNT_TYPES, permissions } from 'utils/permissions';
import App from './components/app.vue';
import Vue3TouchEvents from 'vue3-touch-events';
import 'utils/dev-mode/auto-login';
import { materialIcons } from '@dbetka/vue-material-icons';
import { initApp } from 'config';
import { ROUTES } from 'config/routes-config';
import '@dbetka/vue-material-icons/dist/vue-material-icons.css';
import { Http } from '@capacitor-community/http';

window.doLogin = async () => {
  const res = await Http.post({
    url: 'https://dev.harcmap.pl/api/v1/auth/sign-in',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: 'user7@harcmap.pl',
      password: 'Password1',
    },
    webFetchExtra: {
      credentials: 'include',
    },
  });
  return res;
};

export const TEST_MODE = () => false; // true when use cypress
initApp();

const app = createApp(App);
app.mixin({
  computed: {
    ROUTES: () => ROUTES,
    ACCOUNT_TYPES: () => ACCOUNT_TYPES,
    TEST_MODE,
  },
  methods: {
    checkPermissions: permissions.checkPermissions,
    checkIsAdmin: permissions.checkIsAdmin,
    checkIsTeamLeader: permissions.checkIsTeamLeader,
    checkIsObserver: permissions.checkIsObserver,
    checkIsCreator: permissions.checkIsCreator,
    checkIsTeamMember: permissions.checkIsTeamMember,
    checkIsCommonUser: permissions.checkIsCommonUser,
  },
});

app.use(Vue3TouchEvents);
app.use(materialIcons);
app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');
