<template>
  <div
    v-if="role"
    class="o-footer"
  >
    <a-button-icon-footer
      v-for="shortcut of getShortcuts()"
      :key="shortcut.label"
      :icon="shortcut.icon"
      :label="shortcut.shortLabel"
      :icon-class="{ 'f-big': shortcut.big }"
      :class="{ 'f-big': shortcut.big, 'f-selected': isActualPath(shortcut) }"
      @click="onClick(shortcut)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AButtonIconFooter from 'atoms/button/icon-footer';
import { logical } from 'vendors/logical';
import { ROUTES } from 'config/routes-config';
import { userUtils } from 'config/users-config';

export default {
  name: 'o-footer',
  components: {
    AButtonIconFooter,
  },
  computed: {
    ...mapGetters('event', [
      'role',
    ]),
  },
  methods: {
    isActualPath ({ path = '' }) {
      if (this.$store.getters['menu/isOpen'])
        return path === '';
      else
        return this.$route.path === path;

    },
    onClick (shortcut) {
      if (logical.isString(shortcut.path) && shortcut.path !== '') {
        this.$router.push(shortcut.path).catch(() => {
          this.$store.commit('menu/close');
        });
      }
      if (logical.isFunction(shortcut.method))
        shortcut.method();

    },
    getShortcuts () {
      const centralButton = {
        ...userUtils.getMenuCentralButton(),
        big: true,
      };
      const menuButton = {
        label: 'Menu',
        shortLabel: 'Menu',
        icon: this.$store.getters['menu/isOpen'] ? this.$icons.names.arrow_forward : this.$icons.names.menu,
        method: () => this.$store.commit('menu/toggle'),
      };
      return [
        ROUTES.start,
        ROUTES.timeoutPoints,
        centralButton,
        ROUTES.map,
        menuButton,
      ];
    },
  },
};
</script>
