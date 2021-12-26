<template>
  <section>
    <m-buttons-list-events
      primary
      :buttons-details="primaryButtons"
      :title="$t('page.eventsList.new')"
    />
    <m-buttons-list-events
      :buttons-details="currentEvents"
      :title="$t('page.eventsList.current')"
    />
    <m-buttons-list-events
      :buttons-details="futureEvents"
      :title="$t('page.eventsList.upcoming')"
    />
    <m-buttons-list-events
      :buttons-details="pastEvents"
      :title="$t('page.eventsList.finished')"
    />
  </section>
</template>

<script>
import MButtonsListEvents from 'molecules/buttons-list-events';
import { MACROS } from 'utils/macros';
import { DATE_FORMATS, displayDate } from 'utils/date';
import { generalConfigUtils } from 'config/general-config';
import { userUtils } from 'config/users-config';
import { eventUtils } from 'utils/event';
import { materialIcons } from '@dbetka/vue-material-icons';
import { autoUpdate } from 'utils/auto-update';
import { ROUTES } from 'config/routes-config';

const ICONS_TYPES = materialIcons.types;

export default {
  name: 'o-events-list',
  components: {
    MButtonsListEvents,
  },
  data: () => ({
    events: [],
    futureEvents: [],
    currentEvents: [],
    pastEvents: [],
  }),
  computed: {
    primaryButtons () {
      return [
        {
          onClick: this.navigateToJoinEvent.bind(this),
          text: this.$t('page.eventsList.joinEvent'),
          iconLeftProps: {
            name: this.$icons.names.check,
          },
        },
        {
          onClick: this.navigateToCreateEvent.bind(this),
          text: this.$t('page.eventsList.createEvent'),
          iconLeftProps: {
            name: this.$icons.names.add,
          },
        },
      ];
    },
  },
  watch: {
    events: function (events) {
      const [past, current, future] = eventUtils.splitEventsByTimePeriods(events);
      this.pastEvents = past.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isPast));
      this.currentEvents = current.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isCurrent));
      this.futureEvents = future.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isFuture));
    },
  },
  mounted () {
    this.events = this.$store.getters['user/userEvents'];
  },
  methods: {
    prepareButtonsDetails (event, timePeriod = MACROS.timePeriods.isCurrent) {
      const {
        eventStartDate,
        eventEndDate,
        eventName,
        eventId,
      } = event;

      const secondLineText = displayDate.timeRange(
        displayDate.inFormat(eventStartDate, DATE_FORMATS.DDMMYYYY),
        displayDate.inFormat(eventEndDate, DATE_FORMATS.DDMMYYYY),
      );

      return {
        onClick: this.signInToEvent.bind(this),
        id: eventId,
        iconLeftProps: {
          name: generalConfigUtils.getIconByTimePeriod(timePeriod),
          class: 'f-text-standard',
        },
        iconRightProps: {
          name: userUtils.getIcon(event),
          class: 'f-text-standard',
          type: ICONS_TYPES.outlined,
        },
        text: eventName,
        secondLineText,
      };
    },
    signInToEvent (eventId) {
      const teamId = this.events.find(event => event.eventId === eventId).teamId;
      const role = this.events.find(event => event.eventId === eventId).role;
      this.$store.dispatch('event/download', { eventId, teamId, role })
        .then(() => {
          autoUpdate.run();
          this.$router.push(ROUTES.start.path);
        })
        .catch(() => {
          this.$store.dispatch('user/signOut').catch(() => undefined);
        });
    },
    navigateToCreateEvent () {
      this.$router.push(this.ROUTES.newEvent.path);
    },
    navigateToJoinEvent () {
      this.$router.push(this.ROUTES.joinEvent.path);
    },
  },
};
</script>
