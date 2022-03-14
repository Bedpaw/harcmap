<template>
  <div :style="getStyle">
    <a-icon :name="$icons.names.stop_circle" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'a-icon-category',
  props: {
    categoryId: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    ...mapGetters('event', [
      'getCategoryById',
    ]),
    getStyle () {
      return {
        color: this.getCategoryById(this.categoryId).pointFillColor,
      };
    },
  },
};
</script>
