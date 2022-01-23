import { ROUTES } from 'config/routes-config';
import PWelcome from 'pages/welcome';
import PError from 'pages/error';
import PAbout from 'pages/about';
import PSignIn from 'pages/auth/sign-in';
import PSignUp from 'pages/auth/sign-up';
import PActivationDone from 'pages/auth/activation-done';
import PActivationWrong from 'pages/auth/activation-wrong';
import PRemindPassword from 'pages/auth/remind-password';
import PChangePassword from 'pages/auth/change-password';
import { AppRoute } from 'src/router/utils';

export const routes = [
  // before login
  [ROUTES.error, PError],
  [ROUTES.welcome, PWelcome],
  [ROUTES.about, PAbout],
  [ROUTES.signIn, PSignIn],
  [ROUTES.signUp, PSignUp],
  [ROUTES.activationDone, PActivationDone],
  [ROUTES.activationWrong, PActivationWrong],
  [ROUTES.remindPassword, PRemindPassword],
  [ROUTES.changePassword, PChangePassword],

  // after login
  [ROUTES.start, () => import(/* webpackChunkName: "async-pages" */ 'pages/start.vue')],
  [ROUTES.timeoutPoints, () => import(/* webpackChunkName: "async-pages" */ 'pages/timeout-points.vue')],
  [ROUTES.collectPoint, () => import(/* webpackChunkName: "async-pages" */ 'pages/collect-point.vue')],
  [ROUTES.collectedPoints, () => import(/* webpackChunkName: "async-pages" */ 'pages/collected-points.vue')],
  [ROUTES.map, () => import(/* webpackChunkName: "async-pages" */ 'pages/map.vue')],
  [ROUTES.adminPanel, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/panel.vue')],
  [ROUTES.spectatorPanel, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/panel.vue')],
  [ROUTES.editEvent, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/edit-event.vue')],
  [ROUTES.shareEvent, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/share-event.vue')],
  [ROUTES.newPoint, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/new-point.vue')],
  [ROUTES.editPointCategory, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/edit-point-category')],
  [ROUTES.newPointCategory, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/new-point-category')],
  [ROUTES.pointCategoriesList, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/point-category-list')],
  [ROUTES.editPoint, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/edit-point.vue')],
  [ROUTES.scoreboard, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/scoreboard.vue')],
  [ROUTES.searchPoint, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/search-point.vue')],
  [ROUTES.newEvent, () => import(/* webpackChunkName: "async-pages" */ 'pages/add-event.vue')],
  [ROUTES.eventsList, () => import(/* webpackChunkName: "async-pages" */ 'pages/events-list.vue')],
  [ROUTES.joinEvent, () => import(/* webpackChunkName: "async-pages" */ 'pages/join-event.vue')],
  [ROUTES.usersList, () => import(/* webpackChunkName: "async-pages" */ 'pages/admin/users-list.vue')],
  [ROUTES.teamView, () => import(/* webpackChunkName: "async-pages" */ 'pages/team-view.vue')],
]
  .map(([route, component]) => ({
    ...AppRoute.getDataForRouter(route),
    component,
  }));
