<template>
  <t-page class="f-text-center">
    <a-button-primary
      v-for="link of links"
      :key="link.name"
      @click="goTo(link)"
    >
      {{ getLabelFromLink(link) }}
    </a-button-primary>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonPrimary from 'atoms/button/primary';
import { ROUTES } from 'config/routes-config';

export default {
  name: 'p-admin-panel',
  components: {
    AButtonPrimary,
    TPage,
  },
  computed: {
    links () {
      if (this.checkIsAdmin()) {
        return [
          { route: ROUTES.scoreboard },
          { route: ROUTES.editEvent },
          { route: ROUTES.shareEvent },
          { route: ROUTES.newPoint },
          { route: ROUTES.searchPoint },
          { route: ROUTES.usersList },
          { route: ROUTES.pointCategoriesList },
          { route: ROUTES.newPointCategory },
        ];
      } else if (this.checkIsObserver()) {
        return [
          { route: ROUTES.scoreboard },
          { route: ROUTES.searchPoint },
        ];
      }
      return [];
    },
  },
  methods: {
    getLabelFromLink (link) {
      return link.route ? link.route.label : link.label;
    },
    goTo (link) {
      link.route ? this.$router.push(link.route) : this.goToUrl(link);
    },
    goToUrl (link) {
      window.location = link.url;
    },
  },
};
</script>
