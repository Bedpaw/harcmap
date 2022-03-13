import { RouteLocationNormalized } from 'vue-router';

export const urlUtils = {
  getQueryParam (name:string):string {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name) || '';
    }
    return '';
  },
  getInvitationKey ():string {
    return this.getQueryParam('invitationKey');
  },

  checkIfRouteLocationNormalized (toBeDetermined: unknown): toBeDetermined is RouteLocationNormalized {
    return !!(toBeDetermined as RouteLocationNormalized).meta;
  },
};
