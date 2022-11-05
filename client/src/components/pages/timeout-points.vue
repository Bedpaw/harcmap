<template>
  <t-page>
    <m-clock />
    <m-table-row-timeout-points
      v-for="point in points"
      :key="point.pointId"
      :point="point"
      @panTo="panToPointLocationOnMap"
    />
    <div
      v-if="points.length === 0"
      class="a-message f-table f-text-center"
    >
      {{ $t('page.timeoutPoints.noResults') }}
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import MTableRowTimeoutPoints from 'molecules/table-row/timeout-points';
import MClock from 'molecules/clock';
import { mapGetters } from 'vuex';
import { map } from 'map';
import { userUtils } from 'config/users-config';
import { pointUtils } from 'utils/point';

export default {
  name: 'p-timeout-points',
  components: {
    TPage,
    MTableRowTimeoutPoints,
    MClock,
  },
  computed: {
    ...mapGetters('event', [
      'getTimeoutPoints',
    ]),
    points () {
      return userUtils.can.seeAllTimeOutPoints(this.$store.getters['event/role'])
        ? this.getTimeoutPoints
        : pointUtils.getTodayPoints(this.getTimeoutPoints);
    },
  },
  methods: {
    panToPointLocationOnMap: map.panToPointLocationOnMap,
  },
};
</script>
