<template>
  <t-scoreboard :admin-details="false" />
</template>

<script>
import { mapGetters } from 'vuex';
import TScoreboard from 'templates/scoreboard';

export default {
  name: 'p-collected-points',
  components: {
    TScoreboard,
  },
  computed: {
    ...mapGetters('team', ['collectedPoints']),
  },
};
</script>
