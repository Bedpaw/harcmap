import { createApp } from 'vue';
import i18n from './dictionary';
import router from './router';
import { store } from 'store';
import './validation';
import { ACCOUNT_TYPES, permissions } from 'utils/permissions';
import App from './components/app.vue';
import VueEllipseProgress from 'vue-ellipse-progress';
import Vue2TouchEvents from 'vue2-touch-events';
import 'utils/dev-mode/auto-login';
import { materialIcons } from '@dbetka/vue-material-icons';
import { initApp } from 'config';
import { ROUTES } from 'config/routes-config';

initApp();

const app = createApp(App);
app.mixin({
  computed: {
    ROUTES: () => ROUTES,
    ACCOUNT_TYPES: () => ACCOUNT_TYPES,
  },
  methods: {
    checkPermissions: permissions.checkPermissions,
    checkIsAdmin: permissions.checkIsAdmin,
    checkIsCommon: permissions.checkIsCommon,
    checkIsLimited: permissions.checkIsLimited,
    checkIsNotLimited: permissions.checkIsNotLimited,
    checkLimitingForRoute: permissions.checkLimitingForRoute,
  },
});

app.use(Vue2TouchEvents);
app.use(VueEllipseProgress);
app.use(materialIcons);
app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');
