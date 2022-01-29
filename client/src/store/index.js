import { createStore } from 'vuex';
import menu from './menu';
import theme from './theme';
import event from './event';
import { user } from './user';
import groups from './groups';
import header from './header';
import popup from './popup';
import mapPopup from './map-popup';
import snackbar from './snackbar';
import guide from './guide';
import { team } from 'store/team';
import { invitations } from 'store/invitations';

export const store = createStore({
  modules: {
    menu,
    theme,
    event,
    user,
    groups,
    header,
    popup,
    mapPopup,
    snackbar,
    guide,
    team,
    invitations,
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
