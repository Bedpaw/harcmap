<template>
  <div
    v-touch:swipe.stop
    class="f-relative f-height-100"
  >
    <slot />
    <div
      id="o-map"
      class="o-map"
    />
    <o-popup-map
      v-if="pointOptions"
      ref="mapPopup"
    />
    <o-popup-point-details ref="pointDetailsPopup" />
  </div>
</template>

<script>
import { map } from 'map';
import OPopupMap from 'organisms/popup/map';
import OPopupPointDetails from './popup/point-details';

export default {
  name: 'o-map',
  components: { OPopupPointDetails, OPopupMap },
  props: {
    pointOptions: {
      type: Boolean,
      default: true,
    },
  },
  mounted () {
    this.$store.commit('mapPopup/setPopupOrganismRef', this.$refs.mapPopup);
    this.$store.commit('mapPopup/setPopupPointOrganismRef', this.$refs.pointDetailsPopup);
    map.createMapWithFeatures();
  },
  beforeUnmount () {
    map.destroyMapWithFeatures();
  },
};
</script>
