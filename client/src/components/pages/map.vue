<template>
  <t-page
    class="f-map"
    :let-swipe-menu="false"
  >
    <o-map />
    <m-banner-timer />
    <div
      class="container"
      :class="{ 'open': open, 'closed': !open }"
    >
      <div :class="{'f-display-none': !open}">
        <o-map-settings />
      </div>

      <div
        :class="{ 'arrow-down-container': !open, 'close-container': open }"
        @click="open = !open"
      >
        <a-icon
          :name="open ? $icons.names.close : $icons.names.arrow_drop_down"
          :size="open ? '24' : '36'"
          :class="{ 'arrow-down': !open, 'close': open }"
          class="arrow-down"
        />
      </div>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OMap from 'organisms/map';
import MBannerTimer from 'molecules/banner-timer';
import OMapSettings from 'organisms/map-settings';
import { AIcon } from '@dbetka/vue-material-icons';
export default {
  name: 'p-map',
  components: {
    OMapSettings,
    MBannerTimer,
    OMap,
    TPage,
    AIcon,
  },
  data: () => ({
    open: false,
  }),

};
</script>

<style>
.container {
  position: absolute;
  z-index: 10;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
}

.open {
  left: 0;
  width: 100vw;
  background: white;
  opacity: 0.9;
  height: 100%;
}
.closed {
  left: calc(50% - 20px);
  width: 40px;
  color: white
}

.arrow-down-container {
  width: 60px;
  border-bottom: 2px solid #07632C;
  background-color: #07632C;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  position: relative;
  top: -15px;
}
.arrow-down {
  position: relative;
  top: 10px;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
