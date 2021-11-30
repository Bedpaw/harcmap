<template>
  <ve-progress
    :progress="progress"
    :angle="-90"
    :color="color"
    :emptyColor="`${color}55`"
    :size="size"
    thickness="7%"
    lineMode="in-over"
    emptyThickness="12%"
    animation="reverse 1000 700"
    :noData="false"
    :hideLegend="false"
    :half="false"
    :gap="10"
    fontSize="16px">
    <span>{{ numberOfCompleted }}/{{ maxRange }}</span>
  </ve-progress>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { EllipseProgress } from 'components/async/ellipse-progress';

export default {
  name: 'm-circle-progress',
  components: {
    VeProgress: defineAsyncComponent(EllipseProgress),
  },
  props: {
    progress: {
      type: Number,
      required: true,
    },
    numberOfCompleted: {
      type: Number,
      required: true,
    },
    maxRange: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      default: 90,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>
