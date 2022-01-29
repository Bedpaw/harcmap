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
};
