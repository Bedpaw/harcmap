<template>
  <a-button-primary
    @click="$emit('click', $event)"
    :class="bigArea? 'f-fill' : 'f-fill f-small-area'"
    :add-class="['f-fill', addClass]"
    :loading="loading"
    :disabled="disabled"
  >
    <slot/> {{ text }}
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
    addClass: {
      type: [Array, String],
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    bigArea: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
