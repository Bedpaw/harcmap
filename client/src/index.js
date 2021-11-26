import { createApp } from 'vue';
import i18n from './dictionary';
import router from './router';
import { store } from 'store';
import { ACCOUNT_TYPES, permissions } from 'utils/permissions';
import App from './components/app.vue';
import veProgress from 'vue-ellipse-progress';
import Vue3TouchEvents from 'vue3-touch-events';
// import { App as NativeApp } from '@capacitor/app';
import 'utils/dev-mode/auto-login';
import { materialIcons } from '@dbetka/vue-material-icons';
import { initApp } from 'config';
import { ROUTES } from 'config/routes-config';
import '@dbetka/vue-material-icons/dist/vue-material-icons.css';
// import { LocalNotifications } from '@capacitor/local-notifications';

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

app.use(Vue3TouchEvents);
app.use(veProgress);
app.use(materialIcons);
app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');

// LocalNotifications.schedule({
//   notifications: [
//     {
//       title: 'Witaj w HarcMap!',
//       body: 'Stwórz okazję do przygody dla swoich przyjaciół!',
//       id: 1,
//       schedule: { at: new Date(Date.now() + 1000 * 5) },
//       sound: null,
//       attachments: null,
//       actionTypeId: '',
//       extra: null,
//     },
//   ],
// });
// LocalNotifications.addListener(
//   'localNotificationActionPerformed',
//   some => alert('ok ' + JSON.stringify(some)),
// );
//
// NativeApp.addListener('backButton', ({ canGoBack }) => {
//   if (canGoBack) router.back();
//   else NativeApp.exitApp();
// });
