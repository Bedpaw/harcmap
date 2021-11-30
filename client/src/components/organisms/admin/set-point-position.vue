<template>
  <o-map
    ref="oMap"
    :point-options="false"
  >
    <m-banner-map
      ref="banner"
      @actionTriggered="onSavePosition"
      @cancel="$emit('cancel')"
    >
      <template #text>
        {{ $t('page.admin.setPointPosition.content') }}
      </template>
    </m-banner-map>
    <m-pointer-map ref="map-pointer" />
  </o-map>
</template>

<script>
import OMap from 'organisms/map';
import MBannerMap from 'molecules/banner-map';
import MPointerMap from 'molecules/map-pointer';
import { map } from 'map';
import { mapConfig } from 'map/config';
import { pointUtils } from 'utils/point';

export default {
  name: 'o-admin-set-new-point-position',
  components: {
    MPointerMap,
    MBannerMap,
    OMap,
  },
  props: {
    point: {
      type: Object,
      required: true,
    },
  },
  emits: ['cancel', 'save'],
  mounted () {
    this.$store.commit('event/setHidePoint', this.point);
    map.updateMapFeatures();
    if (pointUtils.hasSetPosition(this.point)) {
      map.panToPointLocationOnMap(this.point, { goToMap: false, zoom: mapConfig.settings.maxZoom });
    }
  },
  beforeUnmount () {
    this.$store.commit('event/clearHidePoint');
    map.updateMapFeatures();
  },
  methods: {
    onSavePosition () {
      this.$refs.banner.emitSuccessMessage()
        .then(() => this.$emit('save', this.getNewPointPosition()));
    },
    getNewPointPosition () {
      const mapPosition = map.getMapPosition();
      return {
        pointLongitude: mapPosition.mapLongitude,
        pointLatitude: mapPosition.mapLatitude,
      };
    },
  },
};
</script>
