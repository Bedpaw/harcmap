<template>
  <div
    v-if="detailsAreOpen"
    class="m-cover f-popup"
    @click.stop="toggle"
  >
    <div
      :class="['o-popup f-empty', addClass]"
      @click.stop
    >
      <a-icon-close-popup @click="toggle" />
      <slot />
    </div>
  </div>
</template>

<script>
import AIconClosePopup from 'atoms/icon/close-popup';

export default {
  name: 'o-popup-empty',
  components: { AIconClosePopup },
  props: {
    addClass: {
      type: String,
      default: 'class',
    },
  },
  data: () => ({
    detailsAreOpen: false,
  }),
  methods: {
    toggle () {
      this.detailsAreOpen = (this.detailsAreOpen === false);
    },
    show () {
      this.detailsAreOpen = true;
    },
    hide () {
      this.detailsAreOpen = false;
    },
  },
};
</script>
