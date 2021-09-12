<template>
  <div
    v-if="detailsAreOpen"
    class="m-cover f-popup"
    @click="toggle"
  >
    <div :class="['o-popup f-empty', addClass]" @click.stop>
      <a-icon-close-popup @click="toggle"/>
      <slot></slot>
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
    },
  },
  data: () => ({
    detailsAreOpen: false,
  }),
  methods: {
    toggle () {
      this.detailsAreOpen = (this.detailsAreOpen === false);
    },
  },
};
</script>
