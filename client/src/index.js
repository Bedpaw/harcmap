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
import { DEVICE_TARGET } from 'config/app-env';
import { TARGETS } from '../webpack/options/enums';

export const TEST_MODE = () => false; // true when use cypress
export const MOBILE_TARGET = () => DEVICE_TARGET === TARGETS.mobileApp;
initApp();

const app = createApp(App);
app.mixin({
  computed: {
    ROUTES: () => ROUTES,
    ACCOUNT_TYPES: () => ACCOUNT_TYPES,
    TEST_MODE,
    MOBILE_TARGET,
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
