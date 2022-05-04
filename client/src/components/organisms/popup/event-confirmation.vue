<template>
  <o-popup-empty ref="popup">
    <article class="f-flex f-flex-col f-flex-al-start f-text-16 f-text-normal">
      <div class="f-pb-2 f-text-bold f-text-18">
        {{ $t('page.joinEvent.confirmData') }}
      </div>
      <div
        v-for="dataRow in dataRows"
        :key="dataRow.label"
      >
        {{ $t(dataRow.label) }}:
        <span class="f-text-bold f-line-24"> {{ dataRow.data }}</span>
      </div>
      <a-button-primary
        add-area-class="f-mt-2 f-mb-0"
        :tests-selector="testSelectors.buttons.joinEventConfirmationSubmit"
        @click="enterEvent"
      >
        {{ $t('form.button.next') }}
      </a-button-primary>
      <a-button-secondary
        add-area-class="f-mt-0 f-mb-1"
        @click="toggle"
      >
        {{ $t('form.button.cancel') }}
      </a-button-secondary>
    </article>
  </o-popup-empty>
</template>

<script>
import OPopupEmpty from 'organisms/popup/empty';
import AButtonPrimary from 'atoms/button/primary';
import AButtonSecondary from 'atoms/button/secondary';
import { userUtils } from 'config/users-config';
import { DATE_FORMATS, displayDate } from 'utils/date';
import { enterEvent } from 'utils/enter-event';
import { testSelectors } from 'data/selectors';

export default {
  name: 'o-popup-event-confirmation',
  components: { OPopupEmpty, AButtonPrimary, AButtonSecondary },
  props: {
    event: {
      required: true,
      type: Object,
    },
    nickname: {
      required: true,
      type: String,
    },
    eventKey: {
      required: true,
      type: String,
    },
    teamName: {
      required: false,
      type: String,
      default: null,
    },
  },
  data: () => ({
    events: [],
    futureEvents: [],
    currentEvents: [],
    pastEvents: [],
    wantsAutoLoginToEvent: true,
    testSelectors,
  }),
  computed: {
    dataRows: function () {
      const {
        eventName,
        eventStartDate,
        eventEndDate,
        role,
      } = this.event;

      return [
        {
          label: 'form.field.eventName',
          data: eventName,
        },
        {
          label: 'form.field.eventInvitation',
          data: this.eventKey,
        },
        {
          label: 'page.joinEvent.eventStartDate',
          data: displayDate.inFormat(eventStartDate, DATE_FORMATS.DDMMYYYYHHmm),
        },
        {
          label: 'page.joinEvent.eventEndDate',
          data: displayDate.inFormat(eventEndDate, DATE_FORMATS.DDMMYYYYHHmm),
        },
        {
          label: 'accountTypes.accountType',
          data: this.$t(userUtils.getNameKey(role)),
        },
        {
          label: 'page.joinEvent.teamName',
          data: this.teamName,
        },
        {
          label: 'page.joinEvent.nickname',
          data: this.nickname,
        },
      ].filter(row => row.data);
    },
  },
  methods: {
    toggle () {
      this.$refs.popup.toggle();
    },
    async enterEvent () {
      const userId = this.$store.getters['user/userId'];
      const event = await api.joinEvent({
        userId,
        eventKey: this.eventKey,
        teamName: this.teamName,
        nickname: this.nickname,
      });
      // TODO Backend responses not consistent
      this.$store.commit('user/addUserEvent', event);
      enterEvent(event.role, this.event.eventId, this.nickname, event.teamId);
    },
  },
};
</script>
