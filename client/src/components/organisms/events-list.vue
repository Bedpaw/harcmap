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
    <span class="f-text-bold f-text-center">{{ $t('page.eventsList.appSettings') }}</span>
    <a-checkbox
      id="wantsAutoLoginToEvent"
      v-model="wantsAutoLoginToEvent"
      class="f-pt-1"
      :assist="$t('page.eventsList.wantsAutoLoginAssist')"
    >
      {{ $t('page.eventsList.wantsAutoLogin') }}
    </a-checkbox>
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
import { appStorage } from 'utils/storage';
import ACheckbox from 'atoms/checkbox';
import { enterEvent } from 'utils/enter-event';
import { mapGetters } from 'vuex';
import { testSelectors } from 'data/selectors';

const ICONS_TYPES = materialIcons.types;

export default {
  name: 'o-events-list',
  components: {
    ACheckbox,
    MButtonsListEvents,
  },
  data: () => ({
    futureEvents: [],
    currentEvents: [],
    pastEvents: [],
    wantsAutoLoginToEvent: appStorage.getItem(appStorage.appKeys.wantsAutoLoginToEvent, appStorage.getIds.email()),
  }),
  computed: {
    ...mapGetters('user', [
      'userEvents',
    ]),
    primaryButtons () {
      return [
        {
          onClick: this.navigateToJoinEvent.bind(this),
          text: this.$t('page.eventsList.joinEvent'),
          testsSelector: testSelectors.buttons.navigateToJoinEvent,
          iconLeftProps: {
            name: this.$icons.names.check,
          },
        },
        {
          onClick: this.navigateToCreateEvent.bind(this),
          text: this.$t('page.eventsList.createEvent'),
          testsSelector: testSelectors.buttons.navigateToCreateEvent,
          iconLeftProps: {
            name: this.$icons.names.add,
          },
        },
      ];
    },
  },
  watch: {
    userEvents: function (events) {
      const [past, current, future] = eventUtils.splitEventsByTimePeriods(events);
      this.pastEvents = past.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isPast));
      this.currentEvents = current.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isCurrent));
      this.futureEvents = future.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isFuture));
    },
    wantsAutoLoginToEvent: function (boolean) {
      appStorage.setItem(appStorage.appKeys.wantsAutoLoginToEvent, boolean, appStorage.getIds.email());
    },
  },
  mounted () {
    const events = this.$store.getters['user/userEvents'];
    const [past, current, future] = eventUtils.splitEventsByTimePeriods(events);
    this.pastEvents = past.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isPast));
    this.currentEvents = current.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isCurrent));
    this.futureEvents = future.map(event => this.prepareButtonsDetails(event, MACROS.timePeriods.isFuture));
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
        testsSelector: testSelectors.buttons.enterEvent(eventId),
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
      const { teamId, role } = this.userEvents.find(event => event.eventId === eventId);
      enterEvent(role, eventId, teamId);
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
