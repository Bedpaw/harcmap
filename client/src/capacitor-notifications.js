// import { App as NativeApp } from '@capacitor/app';
// import { LocalNotifications } from '@capacitor/local-notifications';

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
