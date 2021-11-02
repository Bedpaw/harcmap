<template>
  <t-event-form
    :on-save="addEvent"
  />
</template>

<script>
import TEventForm from 'templates/event-form';

export default {
  name: 'p-admin-add-event',
  components: {
    TEventForm,
  },
  methods: {
    addEvent (event) {
      return this.$store.dispatch('event/addEvent', event);
    },
  },
};
</script>
