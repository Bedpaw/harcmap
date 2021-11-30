<template>
  <div>
    <div class="m-grid f-point">
      <div>
        <a-icon-category :category-id="point.pointCategory" />
      </div>
      <div>{{ point.pointId }}</div>
      <div>{{ getCategoryById(point.pointCategory).pointValue }} {{ $t('general.pointUnit') }}</div>
      <div>
        <a-icon
          :name="$icons.names.map"
          @click="panTo(point)"
        />
      </div>
      <div>
        <a-icon
          :name="$icons.names.arrow_drop_down"
          @click="toggleDetails"
        />
      </div>
    </div>
    <div
      v-if="detailsAreOpen"
      class="f-line-18 f-text-14 f-text-left f-pl-3 f-pb-1"
    >
      {{ $t('general.cords') }}: <span class="f-text-bold">{{ point.pointLatitude.toFixed(5) }}, {{ point.pointLongitude.toFixed(5) }}</span> <br>
      {{ $t('general.collectTime') }}: <span class="f-text-bold">{{ getCollectionTime }}</span>
    </div>
  </div>
</template>

<script>
import AIconCategory from 'atoms/icon/category';
import { mapGetters } from 'vuex';
import { map } from 'map';
import { displayDate } from 'utils/date';

export default {
  name: 'm-row-point',
  components: {
    AIconCategory,
  },
  props: {
    point: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    detailsAreOpen: false,
  }),
  computed: {
    ...mapGetters('event', [
      'getCategoryById',
    ]),
    getCollectionTime () {
      return displayDate.relativeToInCalendarFormat(this.point.pointCollectionTime);
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
