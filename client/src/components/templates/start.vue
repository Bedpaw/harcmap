<template>
  <t-page class="f-start">
    <m-panel
      :title="eventName"
      :images-related-to-themes="panelImages"
      :styles-for-images="panelStylesForImages"
    >
      <div>
        {{ mainMessage }}
      </div>
    </m-panel>

    <div class="m-collection f-button f-px-2">
      <slot name="buttons" />
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import MPanel from 'molecules/panel';
import { mapGetters } from 'vuex';
import { THEMES } from 'utils/style-manager';
import { eventUtils } from 'utils/event';
import { DATE_FORMATS, displayDate } from 'utils/date';

export default {
  name: 't-start',
  components: {
    MPanel,
    TPage,
  },
  data: () => ({
    mainMessage: '',
  }),
  computed: {
    ...mapGetters('event', [
      'eventName',
    ]),
    ...mapGetters('event', {
      event: 'eventBasicInformation',
    }),
    panelImages () {
      const images = {};
      images[THEMES.dark] = '/img/compass.jpg';
      images[THEMES.light] = '/img/compass.jpg';
      return images;
    },
    panelStylesForImages () {
      const styles = {};
      styles[THEMES.dark] = 'background-size: auto 100%';
      styles[THEMES.light] = 'background-size: auto 100%';
      return styles;
    },
  },
  mounted () {
    this.updateMainMessage();
    this.$options.interval = setInterval(this.updateMainMessage, 1000 * 60);
  },
  beforeUnmount () {
    clearInterval(this.$options.interval);
  },
  methods: {
    updateMainMessage () {
      this.mainMessage = this.createMainMessage();
    },
    createMainMessage () {
      const { eventStartDate, eventEndDate } = this.event;
      const { isBeforeStart, isOnGoing, isEndDateToday } = eventUtils;

      if (isBeforeStart(this.event))
        return this.$t('page.start.eventStartDate') + displayDate.inFormat(eventStartDate, DATE_FORMATS.DDMMYYYYHHmm);

      if (isOnGoing(this.event)) {
        if (isEndDateToday(this.event))
          return this.$t('page.start.eventEndTime') + displayDate.inFormat(eventEndDate, DATE_FORMATS.HHmm);

        return this.$t('page.start.eventEndDate') + displayDate.inFormat(eventEndDate, DATE_FORMATS.DDMMYYYYHHmm);
      }
      return this.$t('page.start.eventIsOutOfDate');
    },
  },
};
</script>
