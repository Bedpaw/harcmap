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
      v-if="checkIsAdmin() && pointOptions"
      ref="mapPopup"
    />
  </div>
</template>

<script>
import { map } from 'map';
import { mapMutations, mapGetters } from 'vuex';
import { toLonLat } from 'ol/proj';
import OPopupMap from 'organisms/popup/map';
import { appStorage } from 'utils/storage';

export default {
  name: 'o-map',
  components: { OPopupMap },
  props: {
    pointOptions: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('event', [
      'eventId',
      'event',
      'eventBasicInformation',
    ]),
  },
  mounted () {
    const pointList = this.$store.getters['event/points'];

    map.create({
      elementId: 'o-map',
      lat: this.event.mapLatitude,
      lon: this.event.mapLongitude,
      zoom: this.event.mapZoom,
    });

    map.points.create({
      list: pointList,
    });

    map.lines.create({
      list: this.$store.getters['user/collectedPoints'],
    });

    // Map popup have to define after map creating.
    this.$refs.mapPopup && this.$refs.mapPopup.definePopup();

    map.realMap.on('moveend', this.saveLastMapPositionToStorage);
  },

  beforeUnmount () {
    map.realMap.un('moveend', this.saveLastMapPositionToStorage);
  },
  methods: {
    ...mapMutations('event', [
      'setMapPosition',
      'setMapZoom',
    ]),
    saveLastMapPositionToStorage () {
      const mapView = map.realMap.getView();
      const [mapLongitude, mapLatitude] = toLonLat(mapView.getCenter());
      const mapZoom = mapView.getZoom();

      this.setMapPosition({
        mapLatitude,
        mapLongitude,
      });
      this.setMapZoom(mapZoom);

      const dataForStorage = {
        mapLatitude,
        mapLongitude,
        mapZoom,
      };
      appStorage.setItem(appStorage.appKeys.mapPosition, dataForStorage, appStorage.getIds.eventIdAndEmail());
    },
  },
};
</script>
