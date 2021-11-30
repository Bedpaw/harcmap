<template>
  <div class="t-page" v-touch:swipe.left="openMenu">
    <slot/>
  </div>
</template>

<script>
import { ROUTES } from 'config/routes-config';
import { mapGetters, mapMutations } from 'vuex';
import { APP_NAME } from 'config/app-env';

export default {
  name: 't-page',
  props: {
    backRoute: {
      type: Object,
      default: () => ({ name: '' }),
    },
    letSwipeMenu: {
      type: Boolean,
      default: true,
    },
  },
  mounted () {
    const route = ROUTES[this.$router.currentRoute.name] || {};
    const title = route.label;
    this.$store.commit('header/setPageTitle', title);
    this.$store.commit('header/setBackRouteName', this.backRoute);
    if (title) {
      document.title = `${title} - ${APP_NAME}`;
    } else {
      document.title = APP_NAME;
    }
  },
  computed: {
    ...mapGetters('user', ['isLogin']),
  },
  methods: {
    ...mapMutations('menu', ['open']),
    openMenu () {
      if (this.letSwipeMenu && this.isLogin) {
        this.open();
      }
    },
  },
};
</script>
