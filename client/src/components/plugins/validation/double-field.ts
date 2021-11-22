import useVuelidate from '@vuelidate/core';
import { computed, SetupContext, watch, Ref } from 'vue';
import { RulesList, ValidationProps } from 'models/validation';
import { undefinedDoubleVuelidate, validationRulesListToConfig } from 'plugins/validation/utils';

export const useDoubleFieldValidation = (props:ValidationProps, context:SetupContext, first:[Ref, RulesList], next:[Ref, RulesList]) => {
  const [firstModel, firstRules] = first;
  const [nextModel, nextRules] = next;

  const v$ = useVuelidate(
    {
      firstModel: validationRulesListToConfig([...props.rules, ...(firstRules || [])]),
      nextModel: validationRulesListToConfig(nextRules || []),
    },
    {
      firstModel,
      nextModel,
    },
  );
  const vuelidate = v$.value || undefinedDoubleVuelidate;

  watch(firstModel, () => vuelidate.firstModel.$touch());
  const isError = computed(() => vuelidate.firstModel?.$error);
  const errorMessage = computed(() => vuelidate.firstModel?.$errors[0]?.$message || '');

  watch(nextModel, () => vuelidate.nextModel.$touch());
  const isNextError = computed(() => vuelidate.nextModel?.$error);
  const nextErrorMessage = computed(() => vuelidate.nextModel?.$errors[0]?.$message || '');

  return {
    first: {
      ref: firstModel,
      error: isError,
      message: errorMessage,
    },
    next: {
      ref: nextModel,
      error: isNextError,
      message: nextErrorMessage,
    },
    v$,
  };
};
