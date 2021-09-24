<template>
  <section>
    <m-buttons-list primary :buttons-details="primaryButtons" :title="$t('page.eventsList.new')"></m-buttons-list>
    <m-buttons-list :buttons-details="currentEvents" :title="$t('page.eventsList.current')"></m-buttons-list>
    <m-buttons-list :buttons-details="upcomingEvents" :title="$t('page.eventsList.upcoming')"></m-buttons-list>
    <m-buttons-list :buttons-details="finishedEvents" :title="$t('page.eventsList.finished')"></m-buttons-list>
  </section>
</template>

<script>
import MButtonsList from 'molecules/buttons-list';
import { USERS_DEFAULT_CONFIG } from 'src/config/users-config';
import { MACROS } from 'utils/macros';
import { DATE_FORMATS, getDateInFormat, splitObjectsListByTime } from 'utils/date';
import { ICONS_TYPES } from '@dbetka/vue-material-icons';
import { GENERAL_DEFAULT_CONFIG } from 'src/config/general-config';
import { eventsListMock } from 'organisms/events-list-mock';

export default {
  name: 'o-events-list',
  components: {
    MButtonsList,
  },
  data: () => ({
    events: [],
    upcomingEvents: [],
    currentEvents: [],
    finishedEvents: [],
  }),
  methods: {
    prepareButtonsDetails (event, eventTimeToCurrentTime = MACROS.timePeriods.current) {
      const {
        eventStartDate,
        eventEndDate,
        eventName,
        eventId,
      } = event;
      const firstDate = getDateInFormat(eventStartDate, DATE_FORMATS.DDMMYYYY);
      const secondDate = getDateInFormat(eventEndDate, DATE_FORMATS.DDMMYYYY);
      const secondLineText = firstDate === secondDate
        ? firstDate
        : `${firstDate} - ${secondDate}`;

      return {
        onClick: this.signInToEvent.bind(this),
        id: eventId,
        iconLeftProps: {
          name: GENERAL_DEFAULT_CONFIG.timeIcons[eventTimeToCurrentTime].icon,
          class: 'f-text-standard',
        },
        iconRightProps: {
          name: USERS_DEFAULT_CONFIG.accountTypeInfo[event.accountType].icon,
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
      const [before, current, after] = splitObjectsListByTime(events, 'eventStartDate', 'eventEndDate');
      this.finishedEvents = after.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.before));
      this.currentEvents = current.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.current));
      this.upcomingEvents = before.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.after));
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
