import { computed, toRefs } from 'vue';
import useVuelidate from '@vuelidate/core';

export const modelValueMixin = {
  props: {
    modelValue: {},
  },
  emits: ['update:modelValue'],
};

export const useModelValue = (props, context) => {
  const { modelValue } = toRefs(props);

  const vModel = computed({
    get () {
      return modelValue.value;
    },
    set (value) {
      context.emit('update:modelValue', value);
    },
  });

  return {
    vModel,
  };
};

export const fieldValidationMixin = {
  mixins: [modelValueMixin],
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },
};

export const useFieldValidation = (props, context, defaultRules = []) => {
  const { vModel } = useModelValue(props, context);

  const config = {};
  for (const rule of [...props.rules, ...defaultRules]) {
    config[rule.$params.type] = rule;
  }
  const v$ = useVuelidate(
    { vModel: config },
    { vModel },
  );

  const isError = computed(() => v$.value.vModel?.$silentErrors.length > 0);
  const errorMessage = computed(() => v$.value.vModel?.$silentErrors[0]?.$message || '');

  return {
    vModel,
    v$,
    isError,
    errorMessage,
  };
};
