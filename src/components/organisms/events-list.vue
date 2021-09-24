<template>
  <section>
    <m-buttons-list primary :buttons-details="primaryButtons" :title="$t('page.eventsList.new')"></m-buttons-list>
    <m-buttons-list :buttons-details="currentEvents" :title="$t('page.eventsList.current')"></m-buttons-list>
    <m-buttons-list :buttons-details="futureEvents" :title="$t('page.eventsList.upcoming')"></m-buttons-list>
    <m-buttons-list :buttons-details="pastEvents" :title="$t('page.eventsList.finished')"></m-buttons-list>
  </section>
</template>

<script>
import MButtonsList from 'molecules/buttons-list';
import { MACROS } from 'utils/macros';
import { DATE_FORMATS, getDateInFormat, getFromToString } from 'utils/date';
import { ICONS_TYPES } from '@dbetka/vue-material-icons';
import { generalConfigUtils } from 'src/config/general-config';
import { eventsListMock } from 'organisms/events-list-mock';
import { userUtils } from 'config/users-config';
import { eventUtils } from 'utils/event';

export default {
  name: 'o-events-list',
  components: {
    MButtonsList,
  },
  data: () => ({
    events: [],
    futureEvents: [],
    currentEvents: [],
    pastEvents: [],
  }),
  methods: {
    prepareButtonsDetails (event, timePeriod = MACROS.timePeriods.isCurrent) {
      const {
        eventStartDate,
        eventEndDate,
        eventName,
        eventId,
      } = event;

      const secondLineText = getFromToString(
        getDateInFormat(eventStartDate, DATE_FORMATS.DDMMYYYY),
        getDateInFormat(eventEndDate, DATE_FORMATS.DDMMYYYY),
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
        secondLineText,
        secondLineTextAddClass: 'f-text-gray f-mt-half ',
        props: {
          text: eventName,
          addClass: 'f-flex f-flex f-flex-col-rev f-flex-al-center f-flex-just-center',
          bigArea: false,
        },
      };
    },
    signInToEvent (eventId) {
      console.log(`Signing in to event with id ${eventId}`);
    },
    navigateToCreateEvent () {
      this.$router.push(this.ROUTES.newEvent.path);
    },
    navigateToJoinEvent () {
      this.$router.push(this.ROUTES.joinEvent.path);
    },
  },
  mounted () {
    this.events = eventsListMock;
  },
  watch: {
    events: function (events) {
      const [past, current, future] = eventUtils.splitEventsByTimePeriods(events);
      this.pastEvents = past.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isPast));
      this.currentEvents = current.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isCurrent));
      this.futureEvents = future.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isFuture));
    },
  },
  computed: {
    primaryButtons () {
      return [
        {
          onClick: this.navigateToJoinEvent.bind(this),
          iconLeftProps: {
            name: this.ICONS.check,
          },
          props: {
            text: this.$t('page.eventsList.joinEvent'),
            bigArea: false,
          },
        },
        {
          onClick: this.navigateToCreateEvent.bind(this),
          iconLeftProps: {
            name: this.ICONS.add,
          },
          props: {
            text: this.$t('page.eventsList.createEvent'),
            bigArea: false,
          },
        },
      ];
    },
  },
};
</script>
