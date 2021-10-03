<template>
  <div id="app">
    <o-header/>
    <div class="f-relative f-flex-1">
      <router-view :key="routerId"/>
    </div>
    <o-footer
      v-touch:swipe.left="openMenuIfLogin"
      v-touch:swipe.right="closeMenu"
    />
    <o-menu/>
    <div
      class="a-cover f-menu"
      :class="isOpen ? 'f-show' : ''"
      @click="closeMenu"
      v-touch:swipe.right="closeMenu"
    />
    <o-popup/>
    <m-snackbar/>
    <o-guide/>
    <transition name="fade">
      <o-loading v-show="isLoading"/>
    </transition>
  </div>
</template>

<script>
import OHeader from 'organisms/header';
import OMenu from 'organisms/menu';
import OFooter from 'organisms/footer';
import OLoading from 'organisms/loading';
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
    OLoading,
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'routerId',
    ]),
    ...mapGetters('menu', [
      'isOpen',
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
