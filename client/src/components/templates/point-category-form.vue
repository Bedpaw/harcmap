<template>
  <t-page class="f-flex f-flex-col">
    <o-form
      :on-submit="onSubmit"
    >
      <a-draw-point
        :circle-style="circleStyle"
        class="f-mb-1"
      />
      <m-field-text
        v-model.trim="values.categoryName"
        :label="$t('form.field.categoryName')"
        :rules="validationRules.eventName"
        :disabled="blockForm"
      />
      <m-select
        v-model="values.pointFillColor"
        :options="availableColors"
        :placeholder="$t('form.field.fillColor')"
        :disabled="blockForm"
      />
      <m-select
        v-model="values.pointStrokeColor"
        :options="availableColors"
        :placeholder="$t('form.field.strokeColor')"
        :disabled="blockForm"
      />
      <m-field-text
        v-model="values.pointValue"
        :label="$t('form.field.pointValue')"
        :rules="validationRules.pointValue"
        :disabled="blockForm"
      />
      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
        :text="$t('form.button.save')"
      />
    </o-form>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import OForm from 'organisms/form';
import MSelect from 'molecules/select';
import AButtonSubmit from 'atoms/button/submit';
import MFieldText from 'molecules/field/text';
import { ref, onMounted, toRefs, computed } from 'vue';
import { useForm } from 'plugins/form';
import ADrawPoint from 'atoms/draw-point';
import { colorsUtils } from 'utils/macros/colors';

export default {
  name: 't-point-category-form',
  components: {
    ADrawPoint,
    MFieldText,
    TPage,
    MSelect,
    OForm,
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
      categoryName: '',
      pointFillColor: colorsUtils.appColors.purple,
      pointStrokeColor: colorsUtils.appColors.black,
      pointValue: 1,
    });

    const form = useForm();
    const { onErrorOccurs, onSuccessOccurs } = form;
    const circleStyle = computed(() => ({
      backgroundColor: values.value.pointFillColor,
      borderColor: values.value.pointStrokeColor,
      width: '40px',
      height: '40px',
    }
    ));

    onMounted(() => Object.assign(values.value, defaultValues.value));

    function onSubmit () {
      onSave.value(values.value)
        .then(onSuccessOccurs)
        .catch(onErrorOccurs);
    }
    return {
      values,
      onSubmit,
      ...form,
      availableColors: colorsUtils.getAllColorsSelectValues,
      circleStyle,
    };
  },
};
</script>
