import { createStore } from 'vuex';
import menu from './menu';
import theme from './theme';
import event from './event';
import { user } from './user';
import allUsers from './all-users';
import header from './header';
import popup from './popup';
import mapPopup from './map-popup';
import snackbar from './snackbar';
import guide from './guide';
import { team } from 'store/team';

export const store = createStore({
  modules: {
    menu,
    theme,
    event,
    user,
    allUsers,
    header,
    popup,
    mapPopup,
    snackbar,
    guide,
    team,
  },
  state: {
    isLoading: true,
    routerId: 0,
  },
  getters: {
    isLoading: state => state.isLoading,
    routerId: state => state.routerId,
  },
  mutations: {
    setIsLoading: (state, payload) => (state.isLoading = payload),
    increaseRouterId: (state) => state.routerId++,
  },
  actions: {},
});
