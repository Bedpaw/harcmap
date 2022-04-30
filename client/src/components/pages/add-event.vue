<template>
  <t-event-form
    :on-save="addEvent"
  />
</template>

<script>
import TEventForm from 'templates/event-form';
import { enterEvent } from 'utils/enter-event';
import { ACCOUNT_TYPES } from 'utils/permissions';

export default {
  name: 'p-admin-add-event',
  components: {
    TEventForm,
  },
  methods: {
    addEvent (event) {
      return this.$store.dispatch('event/addEvent', { event, userId: this.$store.getters['user/userId'] })
        .then(event => {
          // TODO Backend responses are not consistent
          this.$store.commit('user/addUserEvent', { ...event, role: ACCOUNT_TYPES.creator });
          // TODO creator nickname
          enterEvent(ACCOUNT_TYPES.creator, event.eventId, 'Twórca');
          return null;
        });
    },
  },
};
</script>
