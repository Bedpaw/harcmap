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

function rulesListToConfig (array = []) {
  const object = {};
  for (const rule of array) {
    object[rule.$params.type] = rule;
  }
  return object;
}

export const useFieldValidation = (props, context, defaultRules = []) => {
  const { vModel } = useModelValue(props, context);

  const v$ = useVuelidate(
    { vModel: rulesListToConfig([...props.rules, ...defaultRules]) },
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

export const useDoubleFieldValidation = (props, context, defaultRules = [], [nextValue, nextRules]) => {
  const { vModel } = useModelValue(props, context);

  const v$ = useVuelidate(
    {
      vModel: rulesListToConfig([...props.rules, ...defaultRules]),
      nextValue: rulesListToConfig(nextRules),
    },
    {
      vModel,
      nextValue,
    },
  );

  watch(vModel, () => v$.value.vModel.$touch());
  const isError = computed(() => v$.value.vModel?.$error);
  const errorMessage = computed(() => v$.value.vModel?.$errors[0]?.$message || '');

  watch(nextValue, () => v$.value.nextValue.$touch());
  const isNextError = computed(() => v$.value.nextValue?.$error);
  const nextErrorMessage = computed(() => v$.value.nextValue?.$errors[0]?.$message || '');

  return {
    vModel,
    v$,
    isError,
    errorMessage,
    isNextError,
    nextErrorMessage,
  };
};
