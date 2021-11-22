<template>
  <o-map ref="oMap" :point-options="false">
    <m-banner-map
      ref="banner"
      @actionTriggered="onSavePosition"
      @cancel="$emit('cancel')"
    >
      <template v-slot:text>{{ $t('page.admin.setMapPosition.content') }}</template>
    </m-banner-map>
  </o-map>
</template>

<script>
import OMap from 'organisms/map';
import MBannerMap from 'molecules/banner-map';
import { map } from 'map';
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';

export default {
  name: 'o-admin-set-map-position',
  components: {
    MBannerMap,
    OMap,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  mounted () {
    map.panTo({
      latitude: this.event.mapLatitude || DEFAULT_EVENT_CONFIG.newEvent.mapLatitude,
      longitude: this.event.mapLongitude || DEFAULT_EVENT_CONFIG.newEvent.mapLongitude,
      zoom: this.event.mapZoom || DEFAULT_EVENT_CONFIG.newEvent.mapZoom,
    });
  },
  methods: {
    onSavePosition () {
      this.$refs.banner.emitSuccessMessage()
        .then(() => this.$emit('save', this.getNewMapPosition()));
    },
    getNewMapPosition () {
      return map.getMapPosition();
    },
  },
};
</script>
