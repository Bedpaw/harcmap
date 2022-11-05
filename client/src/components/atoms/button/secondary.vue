<template>
  <a-button
    :add-class="['f-secondary', addClass]"
    :add-area-class="[addAreaClass]"
    :loading="loading"
    :loading-img="loadingImg"
    :disabled="disabled"
    :tests-selector="testsSelector"
  >
    <slot />
  </a-button>
</template>

<script lang="ts">
import AButton from 'atoms/button.vue';
import { THEMES } from 'utils/style-manager';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'a-button-secondary',
  components: { AButton },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    addClass: {
      type: [Array, String],
      default: '',
    },
    addAreaClass: {
      type: [Array, String],
      default: '',
    },
    testsSelector: {
      type: String,
      default: 'button-secondary',
    },
  },
  computed: {
    loadingImg () {
      if (this.$store.getters['theme/name'] === THEMES.dark)
        return '/img/zhp-52.png';
      else
        return '/img/zhp-green-52.png';

    },
  },
});
</script>
