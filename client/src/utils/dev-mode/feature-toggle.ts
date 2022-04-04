// Feature toggles enable to use dev features at production;
import { urlUtils } from 'utils/url';

export const featureToggles = {
  // Example to enable it enter -> /map?GPS=true;
  FEATURE_TOGGLE_NAVIGATION: () => !!urlUtils.getQueryParam('GPS'),
};
