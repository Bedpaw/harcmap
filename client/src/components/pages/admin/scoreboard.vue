<template>
  <t-scoreboard :admin-details="true" />
</template>

<script>
import TScoreboard from 'templates/scoreboard';

export default {
  name: 'p-scoreboards',
  components: {
    TScoreboard,
  },
};
</script>
