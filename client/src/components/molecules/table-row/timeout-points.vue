<template>
  <div class="m-grid f-timeout-points">
    <a-icon
      :name="timerIcon"
      size="24"
      :class="classForTimer"
    />

    <div>
      <div class="f-text-left">
        {{ point.pointName }}
      </div>
      <div class="f-text-14">
        {{ availabilityTimeAsString }}
      </div>
    </div>

    <a-icon
      v-show="shouldShowPanToIcon"
      :name="$icons.names.map"
      size="24"
      :class="classForMap"
      @click="panTo(point)"
    />
  </div>
</template>

<script>
import { DATE_FORMATS, displayDate } from 'utils/date';
import { pointUtils } from 'utils/point';

export default {
  name: 'm-table-row-timeout-points',
  props: {
    point: {
      required: true,
      type: Object,
    },
  },
  computed: {
    timerIcon () {
      return pointUtils.getTimeIcon(this.point);
    },
    shouldShowPanToIcon () {
      return pointUtils.isPast(this.point) === false || this.checkIsAdmin();
    },
    availabilityTimeAsString () {
      return displayDate.timeRange(
        displayDate.relativeToInCalendarFormat(this.point.pointAppearanceTime),
        displayDate.inFormat(this.point.pointExpirationTime, DATE_FORMATS.HHmm),
      );
    },
    classForMap () {
      if (this.checkIsAdmin() || pointUtils.isTimeoutActive(this.point)) return '';
      else return 'f-disabled-point';
    },
    classForTimer () {
      return pointUtils.getTimeClass(this.point);
    },
  },
  methods: {
    panTo (point) {
      if (this.checkIsAdmin()) {
        this.$emit('panTo', point);
        return;
      }
      pointUtils.isTimeoutActive(this.point) && this.$emit('panTo', point);
    },
  },

};
</script>
