<template>
  <o-header />
  <div class="f-relative f-flex-1">
    <router-view :key="routerId" />
  </div>
  <o-footer
    v-touch:swipe.right="closeMenu"
  />
  <o-menu v-if="role" />
  <div
    v-touch:swipe.right="closeMenu"
    class="a-cover f-menu"
    :class="menuIsOpen ? 'f-show' : ''"
    @click="closeMenu"
  />
  <o-popup />
  <m-snackbar />
  <transition name="fade">
    <!-- o-guide `v-if` and `transition` must be here because of async dependencies -->
    <o-guide v-if="guideIsOpen" />
  </transition>
  <o-loading-app v-if="!TEST_MODE" />
</template>

<script>
import OHeader from 'organisms/header';
import OMenu from 'organisms/menu';
import OFooter from 'organisms/footer';
import OLoadingApp from 'organisms/loading-app';
import { mapGetters, mapMutations } from 'vuex';
import OPopup from 'organisms/popup';
import MSnackbar from 'molecules/snackbar';
import OGuide from 'organisms/guide';

export default {
  components: {
    OGuide,
    MSnackbar,
    OPopup,
    OHeader,
    OMenu,
    OFooter,
    OLoadingApp,
  },
  computed: {
    ...mapGetters([
      'routerId',
    ]),
    ...mapGetters('menu', {
      menuIsOpen: 'isOpen',
    }),
    ...mapGetters('guide', {
      guideIsOpen: 'isOpen',
    }),
    ...mapGetters('event', [
      'role',
    ]),
  },
  mounted () {
    // Mobile browsers calculate viewport height in wrong way - setVH is correction for it.
    this.setVH();
    window.addEventListener('resize', () => this.setVH());
  },
  methods: {
    ...mapMutations('menu', {
      openMenu: 'open',
      closeMenu: 'close',
    }),
    setVH () {
      const VH = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${VH}px`);
    },
    openMenuIfLogin () {
      this.$store.getters['user/isLogin'] && this.openMenu();
    },
  },
};
</script>
