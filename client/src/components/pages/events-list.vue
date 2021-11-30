<template>
  <t-page>
    <o-events-list />
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OEventsList from 'organisms/events-list';

export default {
  name: 'p-events-list',
  components: {
    OEventsList,
    TPage,
  },
};
</script>
