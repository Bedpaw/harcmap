<template>
  <t-page
    class="f-map"
    :let-swipe-menu="false"
  >
    <o-map />
    <m-banner-timer />
    <o-map-settings-toggler />
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OMap from 'organisms/map';
import MBannerTimer from 'molecules/banner-timer';
import OMapSettingsToggler from 'organisms/map-settings-toggler';
import { featureToggles } from '../../utils/dev-mode/feature-toggle';
export default {
  name: 'p-map',
  components: {
    MBannerTimer,
    OMap,
    TPage,
    OMapSettingsToggler,
  },
  data: () => ({
    featureToggles,
  }),
};
</script>
