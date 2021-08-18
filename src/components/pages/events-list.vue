<template>
  <t-page class="f-text-center">
    <a-button-primary @click="$router.push(ROUTES.newEvent)">
      Nowe wydarzenie
    </a-button-primary>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonPrimary from 'atoms/button/primary';

export default {
  name: 'p-events-list',
  components: {
    TPage,
    AButtonPrimary,
  },
};
</script>
