import { computed, toRefs, watch } from 'vue';
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

  watch(vModel, () => v$.value.vModel.$touch());
  const isError = computed(() => v$.value.vModel?.$error);
  const errorMessage = computed(() => v$.value.vModel?.$errors[0]?.$message || '');

  return {
    vModel,
    v$,
    isError,
    errorMessage,
  };
};
