<template>
  <t-page class="f-flex f-flex-col">
    <o-form :on-submit="onSubmit">
      <m-field-text
        v-model.trim="values.eventName"
        :label="$t('form.field.eventName')"
        :rules="validationRules.eventName"
        :disabled="blockForm"
      />
      <m-field-text
        v-model="values.eventId"
        disabled
        :label="$t('form.field.eventId')"
        :assist="$t('form.assist.eventId')"
      />
      <m-select
        v-model="values.mapRefreshTime"
        :options="options"
        :placeholder="$t('form.field.mapRefreshTime')"
        :disabled="blockForm"
      />
      <m-field-datetime-range
        v-model:first-date="values.eventStartDate"
        v-model:next-date="values.eventEndDate"
        :label="[$t('form.field.eventStartDate'), $t('form.field.eventEndDate')]"
        :disabled="blockForm"
      />

      <a-button-secondary
        :disabled="blockForm"
        class="f-text-center f-mt-0"
        add-class="f-icon-inside"
        @click="eventPositionIsSetting = true"
      >
        <a-icon
          :name="hasSetPosition ? $icons.names.check_box : $icons.names.check_box_outline_blank"
          class="f-mr-1"
        />
        <div>{{ $t('form.button.setDefaultMapPositionAndZoom') }}</div>
      </a-button-secondary>

      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
        :text="$t('form.button.save')"
      />
    </o-form>
    <o-float-container v-if="eventPositionIsSetting">
      <o-admin-set-map-position
        :event="values"
        @save="saveNewPosition"
        @cancel="eventPositionIsSetting = false"
      />
    </o-float-container>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OForm from 'organisms/form';
import MSelect from 'molecules/select';
import AButtonSecondary from 'atoms/button/secondary';
import AButtonSubmit from 'atoms/button/submit';
import MFieldText from 'molecules/field/text';
import { ErrorMessage } from 'utils/error-message';
import OFloatContainer from 'organisms/float-container';
import OAdminSetMapPosition from 'organisms/admin/set-map-position';
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';
import { idUtils } from 'utils/id';
import { eventUtils } from 'utils/event';
import { computed, ref, onMounted, toRefs } from 'vue';
import { useForm } from 'plugins/form';
import { translator } from 'dictionary';
import MFieldDatetimeRange from 'molecules/field/datetime-range';

export default {
  name: 't-event-form',
  components: {
    MFieldDatetimeRange,
    OAdminSetMapPosition,
    OFloatContainer,
    MFieldText,
    TPage,
    MSelect,
    OForm,
    AButtonSecondary,
    AButtonSubmit,
  },
  props: {
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
    onSave: {
      type: Function,
      required: true,
    },
  },
  setup (props) {
    const { defaultValues, onSave } = toRefs(props);

    const values = ref({
      eventName: '',
      eventId: idUtils.generateNewId(),
      mapRefreshTime: DEFAULT_EVENT_CONFIG.mapRefreshTime,
      eventStartDate: null,
      eventEndDate: null,
      mapLatitude: null,
      mapLongitude: null,
      mapZoom: null,
    });

    const options = ref(DEFAULT_EVENT_CONFIG.mapRefreshTimeOptions);
    const eventPositionIsSetting = ref(false);

    const form = useForm();
    const { onErrorOccurs, onSuccessOccurs } = form;

    const hasSetPosition = computed(() => eventUtils.hasSetPosition(values.value));

    function saveNewPosition (newPosition) {
      Object.assign(values.value, newPosition);
      eventPositionIsSetting.value = false;
    }

    function onSubmit () {
      if (hasSetPosition.value === false) {
        onErrorOccurs(new ErrorMessage(translator.t('communicate.editEvent.positionIsRequired')));
        return;
      }
      onSave.value(eventUtils.convertEventToSend(values.value))
        .then(onSuccessOccurs)
        .catch(onErrorOccurs);
    }

    onMounted(() => Object.assign(values.value, eventUtils.convertEventToForm(defaultValues.value)));

    return {
      values,
      saveNewPosition,
      onSubmit,
      ...form,
      options,
      eventPositionIsSetting,
      hasSetPosition,
    };
  },
};
</script>
