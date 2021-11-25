<template>
  <a-icon
    class="a-icon f-close-popup"
    :class="addClass"
    :name="$icons.names.close"
    :size="size"
  />
</template>

<script>

export default {
  name: 'a-icon-close-popup',
  props: {
    size: {
      type: String,
      default: '32',
    },
    addClass: {
      type: [String, Array],
      default: '',
    },
  },
};
</script>
