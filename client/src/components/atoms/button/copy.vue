<template>
  <a-button-secondary
    :disabled="disabled"
    add-class="f-flex f-flex-just-center f-flex-al-center"
  >
    <a-icon
      class="f-mr-1"
      :name="$icons.names.copy_all"
      size="24"
      outlined
    />
    <slot v-if="text === ''" />
    {{ text }}
  </a-button-secondary>
</template>

<script lang="ts">
import AButtonSecondary from 'atoms/button/secondary.vue';

export default {
  name: 'a-button-copy',
  components: { AButtonSecondary },
  props: {
    full: { type: Boolean, default: false },
    textToCopy: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: '' },
  },
};
</script>
