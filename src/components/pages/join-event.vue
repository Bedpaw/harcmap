<template>
  <t-page :back-route="ROUTES.eventsList">
    <o-form :on-submit="toggleDetails">
      <m-input
        :disabled="blockForm"
        :placeholder="$t('form.field.eventId')"
        v-model="eventCode"
        :assist="$t('form.assist.joinEventCode')"
      />
      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
      />
    </o-form>
    <o-popup-event-confirmation ref="popupScore" :event="event"/>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OForm from 'organisms/form';
import MInput from 'molecules/input';
import AButtonSubmit from 'atoms/button/submit';
import { mixins } from 'mixins/base';
import OPopupEventConfirmation from 'organisms/popup/event-confirmation';
import { eventsListMock } from 'organisms/events-list-mock';

export default {
  name: 'p-join-event',
  mixins: [mixins.form],
  components: {
    OPopupEventConfirmation,
    TPage,
    OForm,
    MInput,
    AButtonSubmit,
  },
  data: () => ({
    eventCode: '',
    blockForm: false,
    isSending: false,
    event: eventsListMock[0],
  }),
  methods: {
    toggleDetails () {
      this.$refs.popupScore && this.$refs.popupScore.toggle();
    },
  },
};
</script>
