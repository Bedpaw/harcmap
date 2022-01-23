<template>
  <div
    v-touch:swipe.left="openMenu"
    class="t-page"
  >
    <slot />
  </div>
</template>

<script>
import { ROUTES } from 'config/routes-config';
import { useStore } from 'vuex';
import { APP_NAME } from 'config/app-env';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
  setup (props) {
    const store = useStore();
    const router = useRouter();

    const isLogin = store.getters['user/isLogin'];
    const menuIsOpen = store.getters['menu/isOpen'];

    onMounted(() => {
      const route = ROUTES[router.currentRoute.value.name] || {};
      const title = route.label;
      store.commit('header/setPageTitle', title);
      store.commit('header/setBackRouteName', props.backRoute);
      if (title) {
        document.title = `${title} - ${APP_NAME}`;
      } else {
        document.title = APP_NAME;
      }
    });

    function openMenu () {
      if (props.letSwipeMenu && isLogin) {
        store.commit('menu/open');
      }
    }

    return {
      isLogin,
      menuIsOpen,
      openMenu,
    };
  },
};
</script>
