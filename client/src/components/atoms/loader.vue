<template>
  <span class="a-loader">
    <img
      class="a-img f-loader"
      :class="addClass"
      :src="img"
      alt="logo"
    >
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'a-loader',
  props: {
    addClass: {
      type: [Array, String],
      default: '',
    },
    img: {
      type: String,
      default: '/img/zhp-52.png',
    },
  },
});
</script>
