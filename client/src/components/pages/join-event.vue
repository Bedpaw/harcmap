<template>
  <t-page :back-route="ROUTES.eventsList">
    <o-form
      :on-submit="openPopUp"
      style="margin-top:50%"
    >
      <m-field-text
        v-model="invitationKey"
        :disabled="blockForm"
        :rules="validationRules.eventId"
        :placeholder="$t('form.field.eventInvitation')"
        :assist="$t('form.assist.joinEventCode')"
        :tests-selector="testSelectors.inputs.invitationKey"
        @input="getEvent"
      />
      <template v-if="event">
        <m-field-text
          v-model="nickname"
          :disabled="blockForm"
          :rules="validationRules.userTeam"
          :placeholder="$t('form.field.nickname')"
          :tests-selector="testSelectors.inputs.nickname"
        />
        <template v-if="shouldDisplayTeamDetails">
          <m-field-text
            v-model="teamName"
            :disabled="blockForm"
            :rules="validationRules.userTeam"
            :placeholder="$t('form.field.teamName')"
            :tests-selector="testSelectors.inputs.teamName"
          />
          <m-select
            v-model="teamColor"
            :options="availableColors"
            :placeholder="$t('form.field.teamColor')"
            :disabled="blockForm"
          />
        </template>
        <a-button-submit
          :disabled="blockForm"
          :is-sending="isSending"
          :tests-selector="testSelectors.buttons.joinEventSubmit"
        />
      </template>
    </o-form>
    <o-popup-event-confirmation
      v-if="event"
      ref="eventConfirmationPopUp"
      :event="event"
      :team-name="teamName"
      :event-key="invitationKey"
      :nickname="nickname"
      :team-color="teamColor"
    />
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OForm from 'organisms/form';
import AButtonSubmit from 'atoms/button/submit';
import MSelect from 'molecules/select';
import OPopupEventConfirmation from 'organisms/popup/event-confirmation';
import { onMounted, ref, computed } from 'vue';
import { useForm } from 'plugins/form';
import { api } from 'api';
import MFieldText from 'molecules/field/text';
import { ErrorMessage } from 'utils/error-message';
import { ACCOUNT_TYPES } from 'utils/permissions';
import { useStore } from 'vuex';
import { urlUtils } from 'utils/url';
import { testSelectors } from 'data/selectors';
import { colorsUtils } from 'utils/macros/colors';

export default {
  name: 'p-join-event',
  components: {
    MFieldText,
    OPopupEventConfirmation,
    TPage,
    OForm,
    AButtonSubmit,
    MSelect,
  },
  setup () {
    const eventKeyRequiredLength = 4;
    const invitationKey = ref('');
    const teamName = ref('');
    const teamColor = ref('');
    const nickname = ref('');
    const event = ref(null);
    const eventConfirmationPopUp = ref(null);
    const form = useForm();
    const store = useStore();

    const shouldDisplayTeamDetails = computed(() => event.value?.role === ACCOUNT_TYPES.teamLeader);

    const getEvent = async () => {
      event.value = null;
      if (invitationKey.value.length !== eventKeyRequiredLength) {
        return;
      }
      try {
        event.value = await api.checkEvent(invitationKey.value, store.getters['user/userId']);
      } catch (e) {
        form.onErrorOccurs((new ErrorMessage(e)));
      }
    };

    function openPopUp () {
      eventConfirmationPopUp.value && eventConfirmationPopUp.value.toggle();
    }

    onMounted(() => {
      invitationKey.value = urlUtils.getInvitationKey();
      if (invitationKey.value) getEvent();
    });

    return {
      ...form,
      invitationKey,
      event,
      eventConfirmationPopUp,
      openPopUp,
      getEvent,
      teamName,
      teamColor,
      nickname,
      shouldDisplayTeamDetails,
      testSelectors,
      availableColors: colorsUtils.colorsSelectValues,
    };
  },
};
</script>
