<template>
  <t-page :back-route="ROUTES.eventsList">
    <o-form
      :on-submit="openPopUp"
      style="margin-top:50%"
    >
      <m-field-text
        v-model="eventKey"
        :disabled="blockForm"
        :rules="validationRules.eventId"
        :placeholder="$t('form.field.eventId')"
        :assist="$t('form.assist.joinEventCode')"
        @input="getEvent"
      />
      <template v-if="event">
        <m-field-text
          v-model="nickname"
          :disabled="blockForm"
          :rules="validationRules.userTeam"
          :placeholder="$t('form.field.nickname')"
        />
        <m-field-text
          v-if="shouldDisplayTeamNameInput"
          v-model="teamName"
          :disabled="blockForm"
          :rules="validationRules.userTeam"
          :placeholder="$t('form.field.teamName')"
        />
        <a-button-submit
          :disabled="blockForm"
          :is-sending="isSending"
        />
      </template>
    </o-form>
    <o-popup-event-confirmation
      v-if="event"
      ref="eventConfirmationPopUp"
      :event="event"
      :team-name="teamName"
      :event-key="eventKey"
      :nickname="nickname"
    />
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OForm from 'organisms/form';
import AButtonSubmit from 'atoms/button/submit';
import OPopupEventConfirmation from 'organisms/popup/event-confirmation';
import { ref, computed } from 'vue';
import { useForm } from 'plugins/form';
import { api } from 'api';
import MFieldText from 'molecules/field/text';
import { ErrorMessage } from 'utils/error-message';
import { ACCOUNT_TYPES } from 'utils/permissions';
import { useStore } from 'vuex';

export default {
  name: 'p-join-event',
  components: {
    MFieldText,
    OPopupEventConfirmation,
    TPage,
    OForm,
    AButtonSubmit,
  },
  setup () {
    const eventKeyRequiredLength = 4;
    const eventKey = ref('');
    const teamName = ref('');
    const nickname = ref('');
    const event = ref(null);
    const eventConfirmationPopUp = ref(null);
    const form = useForm();
    const store = useStore();

    const shouldDisplayTeamNameInput = computed(() => event?.value?.role === ACCOUNT_TYPES.teamLeader);

    const getEvent = async () => {
      event.value = null;
      if (eventKey.value.length !== eventKeyRequiredLength) {
        return;
      }
      try {
        event.value = await api.checkEvent(eventKey.value, store.getters['user/userId']);
      } catch (e) {
        form.onErrorOccurs((new ErrorMessage(e)));
      }
    };

    function openPopUp () {
      eventConfirmationPopUp.value && eventConfirmationPopUp.value.toggle();
    }

    return {
      ...form,
      eventKey,
      event,
      eventConfirmationPopUp,
      openPopUp,
      getEvent,
      teamName,
      nickname,
      shouldDisplayTeamNameInput,
    };
  },
};
</script>
