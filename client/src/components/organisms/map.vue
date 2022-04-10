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
  </div>
</template>

<script>
import { map } from 'map';
import OPopupMap from 'organisms/popup/map';

export default {
  name: 'o-map',
  components: { OPopupMap },
  props: {
    pointOptions: {
      type: Boolean,
      default: true,
    },
  },
  mounted () {
    this.$store.commit('mapPopup/setPopupOrganismRef', this.$refs.mapPopup);
    map.createMapWithFeatures();
  },
  beforeUnmount () {
    map.destroyMapWithFeatures();
  },
};
</script>
