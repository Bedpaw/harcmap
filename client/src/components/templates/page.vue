<template>
  <div
    class="t-page"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ROUTES } from 'config/routes-config';
import { useStore } from 'vuex';
import { APP_NAME } from 'config/app-env';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
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

    const isAfterEventChoose = store.getters['event/eventId'];
    const menuIsOpen = store.getters['menu/isOpen'];

    onMounted(() => {
      const currentRouteName = router.currentRoute.value.name;
      const route = ROUTES[currentRouteName as keyof typeof ROUTES] || {};
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
      if (props.letSwipeMenu && isAfterEventChoose) {
        store.commit('menu/open');
      }
    }

    return {
      menuIsOpen,
      openMenu,
    };
  },
});
</script>
