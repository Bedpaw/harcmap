<template>
  <t-event-form
    :default-values="defaultValues"
    :on-save="updateEvent"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import TEventForm from 'templates/event-form';

export default {
  name: 'p-admin-edit-event',
  components: {
    TEventForm,
  },
  data: () => ({
    defaultValues: {},
  }),
  computed: {
    ...mapGetters('event', [
      'event',
      'eventBasicInformation',
    ]),
  },
  created () {
    this.defaultValues.eventName = this.event.eventName;
    this.defaultValues.mapRefreshTime = this.event.mapRefreshTime;
    this.defaultValues.eventStartDate = this.event.eventStartDate;
    this.defaultValues.eventEndDate = this.event.eventEndDate;
    this.defaultValues.mapLatitude = this.event.mapDefaultLatitude;
    this.defaultValues.mapLongitude = this.event.mapDefaultLongitude;
    this.defaultValues.mapZoom = this.event.mapDefaultZoom;
    this.defaultValues.eventSettings = this.event.eventSettings;
  },
  methods: {
    updateEvent (event) {
      const updatedEvent = {
        ...this.eventBasicInformation,
        ...event,
      };
      return this.$store.dispatch('event/updateEvent', updatedEvent);
    },
  },
};
</script>
