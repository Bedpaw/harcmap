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
import { ref } from 'vue';
import { useForm } from 'plugins/form';

export default {
  name: 'p-join-event',
  components: {
    OPopupEventConfirmation,
    TPage,
    OForm,
    MInput,
    AButtonSubmit,
  },
  mixins: [mixins.form],
  setup () {
    const eventCode = ref('');
    const event = ref(eventsListMock[0]);
    const popupScore = ref(null);
    const form = useForm();

    function toggleDetails () {
      popupScore.value && popupScore.value.toggle();
    }

    return {
      ...form,
      eventCode,
      event,
      popupScore,
      toggleDetails,
    };
  },
};
</script>
