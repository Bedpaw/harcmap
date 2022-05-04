<template>
  <div class="o-header">
    <div
      class="m-panel f-header f-side"
      :class="{ 'f-hidden': isMainPage }"
    >
      <a-icon
        :name="$icons.names.arrow_back"
        size="28"
        @click="$router.push(pathBackButton)"
      />
    </div>
    <div class="m-panel f-header f-center">
      <template v-if="pageTitle !== ''">
        <div class="a-subtitle">
          {{ pageTitle }}
        </div>
        <div class="a-logo">
          {{ appName }}
        </div>
      </template>
      <div
        v-else
        class="a-logo f-big"
      >
        {{ appName }}
      </div>
    </div>
    <div
      class="m-panel f-header f-side f-right"
    >
      <a-icon
        v-if="$route.name === ROUTES.eventsList.name && eventId === null"
        :name="$icons.names.logout"
        outlined
        size="28"
        class="f-header"
        @click="signOut"
      />
      <a-icon
        :name="ROUTES.collectedPoints.icon"
        size="28"
        class="f-header"
        :class="{ 'f-hidden': eventId === null }"
        @click="redirectToCollectedPointsOrScoreboard"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from 'config/routes-config';
import { APP_NAME } from 'config/app-env';

export default {
  name: 'o-header',
  data: () => ({
    appName: APP_NAME.toUpperCase(),
  }),
  computed: {
    ...mapGetters('event', [
      'eventId',
    ]),
    ...mapGetters('user', [
      'isLogin',
    ]),
    ...mapGetters('team', [
      'collectedPointsIds',
    ]),
    ...mapGetters('header', [
      'pageTitle',
      'backRouteName',
    ]),
    isMainPage () {
      return [
        ROUTES.welcome.name,
        ROUTES.start.name,
        ROUTES.adminPanel.name,
        ROUTES.spectatorPanel.name,
        ROUTES.eventsList.name,
      ].includes(this.$route.name);
    },
    pathBackButton () {
      const isAdmin = this.checkIsAdmin();
      const IsLimitedAdmin = this.checkIsObserver();
      if (this.backRouteName.params) return this.backRouteName;
      if (this.backRouteName.name) return ROUTES[this.backRouteName.name].path;
      if (IsLimitedAdmin) return ROUTES.spectatorPanel.path;
      if (isAdmin) return ROUTES.adminPanel.path;
      if (this.isLogin) return ROUTES.start.path;
      else return ROUTES.welcome.path;
    },
  },
  methods: {
    redirectToCollectedPointsOrScoreboard () {
      const route = this.checkIsObserver() ? ROUTES.scoreboard : ROUTES.collectedPoints;
      this.$router.push(route.path);
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
