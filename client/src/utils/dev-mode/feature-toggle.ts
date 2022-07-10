// Feature toggles enable to use dev features at production;
import { urlUtils } from 'utils/url';

export const featureToggles = {
  // Example to enable it enter -> /map?GPS=true;
  FEATURE_TOGGLE_NAVIGATION: () => true,
  FEATURE_TOGGLE_OLD_GUIDE: () => !!urlUtils.getQueryParam('OLD_GUIDE'),
  FEATURE_TOGGLE_USER_LIST_POPUP: () => !!urlUtils.getQueryParam('USER_POPUP'),
  FEATURE_TOGGLE_MAP_MENU: () => true,
  FEATURE_TOGGLE_HIGH_ACCURACY: () => !!urlUtils.getQueryParam('ACC'),
  // !!urlUtils.getQueryParam('MAP_MENU'),
  // !!urlUtils.getQueryParam('GPS'),
};
