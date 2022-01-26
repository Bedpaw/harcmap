<template>
  <a-button-secondary
    :disabled="disabled"
    add-class="f-flex f-flex-just-center f-flex-al-center"
  >
    <slot v-if="text === ''" />
    {{ text }}
    <a-icon
      class="f-ml-1"
      :name="$icons.names.copy_all"
      size="24"
      outlined
    />
  </a-button-secondary>
</template>

<script>
import AButtonSecondary from 'atoms/button/secondary';

export default {
  name: 'a-button-copy',
  components: { AButtonSecondary },
  props: {
    textToCopy: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
};
</script>
