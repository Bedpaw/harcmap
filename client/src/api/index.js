import { realApi } from 'api/real/real';

export const api = {
  ...realApi,
};

// if (DEVELOPMENT_MODE) {
window.api = api;
// }
