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
    <!-- Do we want this? Provide translation if yes TODO-->
    <span class="f-text-bold f-text-center">Ustawienia aplikacji:</span>
    <a-checkbox
      id="wantsAutoLoginToEvent"
      v-model="wantsAutoLoginToEvent"
      class="f-pt-1"
      assist="Po zalogowaniu przejdź do ostatniego wydarzenia"
    >
      Automatyczne logowanie
      {{ }}
    </a-checkbox>
    <!-- Do we want this? Provide translation if yes-->
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
import { appStorage } from 'utils/storage';
import ACheckbox from 'atoms/checkbox';

const ICONS_TYPES = materialIcons.types;

export default {
  name: 'o-events-list',
  components: {
    ACheckbox,
    MButtonsListEvents,
  },
  data: () => ({
    events: [],
    futureEvents: [],
    currentEvents: [],
    pastEvents: [],
    wantsAutoLoginToEvent: true,
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
    wantsAutoLoginToEvent: function (boolean) {
      appStorage.setItem(appStorage.appKeys.wantsAutoLoginToEvent, boolean, appStorage.getIds.email());
    },
  },
  mounted () {
    this.events = this.$store.getters['user/userEvents'];
    this.autoSignInToEventIfPossible();
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
      const lastRoute = appStorage.getItem(appStorage.appKeys.lastRoute, appStorage.getIds.eventIdAndEmail());
      this.$store.dispatch('event/download', { eventId, teamId, role })
        .then(() => {
          autoUpdate.run();
          this.$router.push(lastRoute ?? ROUTES.start.path).then(() => this.updateStorageAfterSuccessLogIn(eventId));
        })
        .catch(() => {
          this.$store.dispatch('user/signOut').catch(() => undefined);
        });
    },
    updateStorageAfterSuccessLogIn (eventId) {
      appStorage.setItem(appStorage.appKeys.recentEvent, eventId, appStorage.getIds.email());
      const isFirstLogIn = appStorage.getItem(appStorage.appKeys.firstLogin, appStorage.getIds.eventIdAndEmail()) === null;
      if (isFirstLogIn) {
        this.$store.commit('guide/open');
        appStorage.setItem(appStorage.appKeys.firstLogin, true, appStorage.getIds.eventIdAndEmail());
      }
    },
    autoSignInToEventIfPossible () {
      this.wantsAutoLoginToEvent = appStorage.getItem(appStorage.appKeys.wantsAutoLoginToEvent, appStorage.getIds.email());
      const isJustLogged = this.$route.query.justLoggedIn;
      const recentEventId = appStorage.getItem(appStorage.appKeys.recentEvent, appStorage.getIds.email());
      if (isJustLogged && recentEventId && this.wantsAutoLoginToEvent) {
        const isRecentEventAvailable = !!this.events.find(event => event.eventId === recentEventId);
        if (isRecentEventAvailable) {
          this.signInToEvent(recentEventId);
        }
      }
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
