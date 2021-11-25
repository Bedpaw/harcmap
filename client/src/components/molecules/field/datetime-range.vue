<template>
  <m-input
    v-model="firstModel"
    type="datetime-local"
    :disabled="disabled"
    :placeholder="label[0]"
    :error="first.error.value"
    :assist="first.message.value || assist[0]"
  />
  <m-input
    v-model="nextModel"
    type="datetime-local"
    :disabled="disabled"
    :placeholder="label[1]"
    :error="next.error.value"
    :assist="next.message.value || assist[1]"
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
import { computed, toRefs } from 'vue';
import { useDoubleFieldValidation } from 'plugins/validation/double-field';
import { validationRules } from 'plugins/validation/rules';

export default {
  name: 'm-field-datetime-range',
  components: { MInput },
  props: {
    disabled: Boolean,
    label: {
      type: Array,
      required: true,
    },
    assist: {
      type: Array,
      default: () => ['', ''],
    },
    rules: {
      type: Array,
      default: () => [],
    },
    firstDate: {
      type: Object,
    },
    nextDate: {
      type: Object,
    },
  },
  setup: (props, context) => {
    const propsRefs = toRefs(props);
    const { rules } = propsRefs;

    const vModelDefault = (modelName) => ({
      get () {
        const modelValue = propsRefs[modelName];
        if (modelValue.value) return displayDate.inFormat(modelValue.value, DATE_FORMATS.YYYYMMDDTHHmm);
        else return null;
      },
      set (value) {
        if (value) {
          context.emit('update:' + modelName, getDate.fromFormat(value, DATE_FORMATS.YYYYMMDDTHHmm));
        } else return null;
      },
    });

    const firstModel = computed(vModelDefault('firstDate'));
    const nextModel = computed(vModelDefault('nextDate'));

    return {
      firstModel,
      nextModel,
      ...useDoubleFieldValidation(
        props,
        context,
        [
          firstModel,
          [...rules.value, ...validationRules.required],
        ],
        [
          nextModel,
          [...rules.value, ...validationRules.dateTimeAfter(firstModel)],
        ],
      ),
    };
  },
};
</script>
