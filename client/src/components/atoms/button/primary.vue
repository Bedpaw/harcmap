<template>
  <a-button
    :add-class="['f-primary', addClass]"
    :add-area-class="[addAreaClass]"
    :loading="loading"
    :disabled="disabled"
    :type="type"
    loading-img="/img/zhp-52.png"
  >
    <slot />
  </a-button>
</template>

<script lang="ts">
import AButton from 'atoms/button.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'a-button-primary',
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
    type: {
      type: String,
      default: 'button',
    },
  },
});
</script>
