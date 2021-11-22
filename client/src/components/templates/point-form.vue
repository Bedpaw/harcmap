<template>
  <t-page class="f-flex f-flex-col">
    <o-form :on-submit="onSubmit">
      <m-field-text
        disabled
        :label="$t('form.field.pointId')"
        v-model="values.pointId"
        :assist="$t('form.assist.pointId')"
      />
      <m-field-text
        :label="$t('form.field.pointName')"
        v-model="values.pointName"
        :rules="rulesForName"
        :assist="isPermanent ? $t('form.assist.fieldNotRequired') : ''"
        :disabled="blockForm"
      />
      <m-select
        :options="typeOptions"
        :placeholder="$t('form.field.pointType')"
        v-model="values.pointType"
        :disabled="blockForm"
      />
      <m-field-datetime-range
        v-if="isTimeout"
        :label="[$t('form.field.pointDateAndAppearanceTime'), $t('form.field.pointDateAndExpirationTime')]"
        v-model:first-date="values.pointAppearanceTime"
        v-model:next-date="values.pointExpirationTime"
        :disabled="blockForm"
      />
      <m-select
        v-if="isPermanent"
        :options="categoryOptions"
        :placeholder="$t('form.field.pointCategory')"
        v-model="values.pointCategory"
        :disabled="blockForm"
      />

      <a-button-secondary
        :disabled="blockForm"
        class="f-text-center f-mt-0"
        add-class="f-icon-inside"
        @click="pointPositionIsSetting = true"
      >
        <a-icon
          :name="hasSetPosition ? $icons.names.check_box : $icons.names.check_box_outline_blank"
          class="f-mr-1"
        />
        <div>{{ $t('form.button.setPointMapPosition') }}</div>
      </a-button-secondary>

      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
        :text="$t('form.button.save')"
      />
    </o-form>
    <o-float-container v-if="pointPositionIsSetting">
      <o-admin-set-new-point-position
        :point="values"
        @save="saveNewPosition"
        @cancel="pointPositionIsSetting = false"
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
import { MACROS } from 'utils/macros';
import MFieldText from 'molecules/field/text';
import { ErrorMessage } from 'utils/error-message';
import OFloatContainer from 'organisms/float-container';
import OAdminSetNewPointPosition from 'organisms/admin/set-point-position';
import { idUtils } from 'utils/id';
import { pointUtils } from 'utils/point';
import { computed, onMounted, ref, toRefs } from 'vue';
import { useForm } from 'plugins/form';
import { translator } from 'dictionary';
import MFieldDatetimeRange from 'molecules/field/datetime-range';

export default {
  name: 't-point-form',
  components: {
    MFieldDatetimeRange,
    OAdminSetNewPointPosition,
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

    const generateDefaultValues = () => ({
      pointId: idUtils.generateNewId(),
      pointName: '',
      pointCategory: MACROS.pointCategory[0].categoryId,
      pointType: MACROS.pointType.permanent,
      pointAppearanceTime: null,
      pointExpirationTime: null,
      pointLongitude: null,
      pointLatitude: null,
      pointCollectionTime: null,
      ...pointUtils.convertPointToForm(defaultValues.value),
    });
    const values = ref(generateDefaultValues());
    const restartValues = () => Object.assign(values.value, generateDefaultValues());

    const typeOptions = computed(() => [
      {
        label: translator.t('general.pointPermanent'),
        value: MACROS.pointType.permanent,
      },
      {
        label: translator.t('general.pointTimeout'),
        value: MACROS.pointType.timeout,
      },
    ]);
    function categoryLabelFactory (id, value) {
      const level = translator.t('general.pointCategoryLevel');
      const unit = translator.t('general.pointUnit');
      return `${id} ${level} - ${value} ${unit}`;
    }
    const categoryOptions = computed(() => MACROS.pointCategory.map((category) =>
      ({
        label: categoryLabelFactory(category.categoryId, category.pointValue),
        value: category.categoryId,
      }),
    ));
    const pointPositionIsSetting = ref(false);

    const form = useForm();
    const { blockForm, validationRules, onErrorOccurs, onSuccessOccurs } = form;

    const isTimeout = computed(() => pointUtils.isTimeOut(values.value));
    const isPermanent = computed(() => pointUtils.isPermanent(values.value));
    const rulesForName = computed(() => isTimeout.value ? validationRules.requiredName : validationRules.name);
    const hasSetPosition = computed(() => pointUtils.hasSetPosition(values.value));

    function saveNewPosition (newPosition) {
      Object.assign(values.value, newPosition);
      pointPositionIsSetting.value = false;
    }
    function ensureValidDataByPointType () {
      if (values.value.pointType === MACROS.pointType.timeout) {
        values.value.pointCategory = 0;
      }
      if (values.value.pointType === MACROS.pointType.permanent) {
        values.value.pointExpirationTime = null;
        values.value.pointAppearanceTime = null;
      }
    }
    function onSubmit () {
      blockForm.value = true;
      if (hasSetPosition.value === false) {
        onErrorOccurs(new ErrorMessage(translator.t('communicate.addPoint.positionIsRequired')));
        return;
      }
      ensureValidDataByPointType();

      onSave.value(pointUtils.convertPointToSend(values.value))
        .then(message => {
          restartValues();
          onSuccessOccurs(message);
        })
        .catch(onErrorOccurs);
    }

    onMounted(() => restartValues());

    return {
      values,
      typeOptions,
      categoryOptions,
      pointPositionIsSetting,
      isPermanent,
      isTimeout,
      rulesForName,
      saveNewPosition,
      onSubmit,
      ...form,
      hasSetPosition,
    };
  },
};
</script>
