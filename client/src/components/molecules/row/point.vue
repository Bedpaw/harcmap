<template>
  <div>
    <div class="m-grid f-point">
      <div>
        <a-icon-category :category-id="point.pointCategory"/>
      </div>
      <div>{{ point.pointId }}</div>
      <div>{{ getCategoryById(point.pointCategory).pointValue }} {{ $t('general.pointUnit') }}</div>
      <div>
        <a-icon :name="ICONS.map" @click="panTo(point)"/>
      </div>
      <div>
        <a-icon
          :name="ICONS.arrow_drop_down"
          @click="toggleDetails"
        />
      </div>
    </div>
    <div v-if="detailsAreOpen" class="f-line-18 f-text-14 f-text-left f-pl-3 f-pb-1">
      <!-- TODO translations      -->
      Współrzędne: <span class="f-text-bold">{{ point.pointLatitude.toFixed(5) }}, {{ point.pointLongitude.toFixed(5) }}</span> <br>
      Czas zebrania: <span class="f-text-bold">{{ getCollectionTime }}</span>
    </div>
  </div>
</template>

<script>
import AIconCategory from 'atoms/icon/category';
import { mapGetters } from 'vuex';
import { map } from 'map';
import { getCollectionTime } from 'utils/date';

export default {
  name: 'm-row-point',
  components: {
    AIconCategory,
  },
  data: () => ({
    detailsAreOpen: false,
  }),
  props: {
    point: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('event', [
      'getCategoryById',
    ]),
    getCollectionTime () {
      return getCollectionTime(this.point.pointCollectionTime);
    },
  },
  methods: {
    toggleDetails () {
      this.detailsAreOpen = (this.detailsAreOpen === false);
    },
    panTo: map.panToPointLocationOnMap,
  },
};
</script>
