<template>
  <m-input
    v-model="vModel"
    type="datetime-local"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
  />
</template>

<!-- USAGE EXAMPLE
  <m-field-datetime
    :label="$t('form.field.date')"
    v-model="date"
    :rules="validationRules.date"
    :disabled="blockForm"
  />
-->

<script>
import MInput from 'molecules/input';
import { DATE_FORMATS, getDate, displayDate } from 'utils/date';
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation/field';
import { computed, toRefs } from 'vue';

export default {
  name: 'm-field-datetime',
  components: { MInput },
  mixins: [fieldValidationMixin],
  props: {
    disabled: Boolean,
    label: {
      type: String,
      default: '',
    },
    assist: {
      type: String,
      default: '',
    },
  },
  setup: (props, context) => {
    const { modelValue } = toRefs(props);

    const vModel = computed({
      get () {
        if (modelValue.value) return displayDate.inFormat(modelValue.value, DATE_FORMATS.YYYYMMDDTHHmm);
        else return null;
      },
      set (value) {
        if (value)
          context.emit('update:modelValue', getDate.fromFormat(value, DATE_FORMATS.YYYYMMDDTHHmm));
        else return null;
      },
    });

    return {
      ...useFieldValidation(props, context, { vModel }),
      vModel,
    };
  },
};
</script>
