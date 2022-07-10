<template>
  <div
    class="f-map-settings-toggle-container"
    :class="{ 'open': open }"
  >
    <div
      v-touch:swipe.up="() => open = false"
      class="f-map-settings"
      :class="{'f-display-none': !open }"
    >
      <o-map-settings />
    </div>

    <div
      class="f-map-settings-toggle-button"
      :class="{ 'opened': open }"
      @click="open = !open"
    >
      <a-icon
        class="arrow-down"
        :name="open ? $icons.names.expand_less : $icons.names.expand_more"
        :size="'32'"
      />
    </div>
  </div>
</template>

<script>
import OMapSettings from 'organisms/map-settings';
export default {
  name: 'o-map-settings-toggler',
  components: {
    OMapSettings,
  },
  data: () => ({
    open: false,
  }),
  watch: {
    open: function (isOpen) {
      const bannerTimer = document.getElementsByClassName('m-banner-timer')[0];
      bannerTimer.style.top = isOpen ? '239px' : 0;
    },
  },
};
</script>
