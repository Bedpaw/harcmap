<template>
  <a-button-primary
    :add-area-class="['f-fill', addAreaClass]"
    :add-class="['f-fill', addClass]"
    :loading="loading"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot /> {{ text }}
  </a-button-primary>
</template>

<script>
import AButtonPrimary from 'atoms/button/primary';

export default {
  name: 'a-button-fill-primary',
  components: { AButtonPrimary },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    addAreaClass: {
      type: [Array, String],
      default: '',
    },
    addClass: {
      type: [Array, String],
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
};
</script>
