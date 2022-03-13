export const urls = {
  withBackendPrefix: (url) => Cypress.env('backendServerRoot') + url,
};
