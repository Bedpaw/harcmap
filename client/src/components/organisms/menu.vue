<template>
  <div
    v-touch:swipe.right="close"
    class="o-menu"
    :class="isOpen ? 'f-open' : ''"
  >
    <div class="a-text f-title f-menu">
      {{ $t('general.hello') }}, {{ $store.getters['event/nickname'] }}
    </div>

    <div
      v-if="checkIsTeamLeader() || checkIsTeamMember()"
      class="a-text f-subtitle f-menu"
    >
      {{ $t('general.alreadyCollectedShort') }}
      <span class="f-text-primary-contrast">
        {{ $store.getters['team/sumOfCollectedPoints'] }} {{ $t('general.pointUnit') }}
      </span>
    </div>
    <div
      v-else
      class="a-text f-subtitle f-menu"
    >
      {{ checkIsAdmin() ? $t('general.fullAdmin') : $t('general.limitedAdmin') }}
    </div>

    <router-link
      v-for="(route, key) in links"
      :key="key"
      :to="route.path"
      class="a-link f-menu"
      :class="{ 'f-selected': isActualPath(route) }"
      @click="close()"
    >
      <a-icon
        :name="route.icon"
        class="f-menu"
      />
      <div class="f-flex-1 f-pl-3">
        {{ route.label }}
      </div>
    </router-link>

    <a-link-menu
      v-if="checkIsCommonUser() && featureToggles.FEATURE_TOGGLE_OLD_GUIDE()"
      :icon="$icons.names.help"
      :text="$t('features.guide.howAppWorks')"
      @click="openGuide()"
    />

    <a-link-menu
      :icon="$icons.names.brightness_4"
      :text="themeName === THEMES.light ? $t('general.darkTheme') : $t('general.lightTheme')"
      @click="toggleTheme()"
    />

    <a-link-menu
      :icon="$icons.names.logout"
      :text="$t('general.logout')"
      @click="signOut()"
    />

    <div
      v-if="isOpen"
      class="a-version"
    >
      v{{ APP_VERSION }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { THEMES } from 'utils/style-manager';
import { ROUTES } from 'config/routes-config';
import router from 'src/router';
import ALinkMenu from 'atoms/link-menu';
import { APP_VERSION } from 'config/app-env';
import { userUtils } from 'config/users-config';
import { featureToggles } from '../../utils/dev-mode/feature-toggle';

export default {
  name: 'o-menu',
  components: { ALinkMenu },
  data: () => ({
    THEMES,
    APP_VERSION,
    canToggleTheme: true,
    featureToggles,
  }),
  computed: {
    ...mapGetters('menu', [
      'isOpen',
    ]),
    links () {
      const commonMenuLinks = [
        ROUTES.start,
        ROUTES.timeoutPoints,
        ROUTES.map,
        ROUTES.eventsList,
      ];
      return [...commonMenuLinks, ...userUtils.getMenuLinks(this.$store.getters['event/role'])];
    },
    themeName () {
      return this.$store.getters['theme/name'];
    },
  },
  methods: {
    ...mapMutations('menu', [
      'toggle',
      'close',
    ]),
    openGuide () {
      this.$store.commit('guide/open');
      this.close();
    },
    isActualPath ({ path = '' }) {
      return this.$route.path === path;
    },
    toggleTheme () {
      if (this.canToggleTheme) {
        this.canToggleTheme = false;
        this.$store.commit('theme/toggle');
        router.hardReload();
        this.close();
        setTimeout(() => {
          this.canToggleTheme = true;
        }, 500);
      }
    },
    signOut () {
      this.$store.dispatch('user/signOut')
        .finally(() => this.onSignOut());
    },
    onSignOut () {
      this.$router.push(ROUTES.welcome.path);
    },
  },
};
</script>
