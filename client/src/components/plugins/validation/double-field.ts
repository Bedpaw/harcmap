import useVuelidate from '@vuelidate/core';
import { computed, SetupContext, watch, Ref } from 'vue';
import { RulesList, ValidationProps } from 'models/validation';
import { useModelValue } from 'plugins/v-model';
import { undefinedVuelidate, validationRulesListToConfig } from 'plugins/validation/utils';

export const useDoubleFieldValidation = (props:ValidationProps, context:SetupContext, defaultRules:RulesList = [], next:[Ref, RulesList]) => {
  const [nextValue, nextRules] = next;
  const { vModel } = useModelValue(props, context);

  const v$ = useVuelidate(
    {
      vModel: validationRulesListToConfig([...props.rules, ...defaultRules]),
      nextValue: validationRulesListToConfig(nextRules),
    },
    {
      vModel,
      nextValue,
    },
  );
  const vuelidate = v$.value || undefinedVuelidate;

  watch(vModel, () => vuelidate.vModel.$touch());
  const isError = computed(() => vuelidate.vModel?.$error);
  const errorMessage = computed(() => vuelidate.vModel?.$errors[0]?.$message || '');

  watch(nextValue, () => vuelidate.nextValue.$touch());
  const isNextError = computed(() => vuelidate.nextValue?.$error);
  const nextErrorMessage = computed(() => vuelidate.nextValue?.$errors[0]?.$message || '');

  return {
    vModel,
    v$,
    isError,
    errorMessage,
    isNextError,
    nextErrorMessage,
  };
};
