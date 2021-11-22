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
  const createErrorObject = (field: Ref, model: {$touch: () => void, $error: string, $errors: {$message: string|undefined}[]}) => {
    watch(field, () => model.$touch());
    return ({
      ref: field,
      error: computed(() => model.$error),
      message: computed(() => model.$errors[0]?.$message || ''),
    });
  };

  return {
    first: createErrorObject(firstModel, vuelidate.firstModel),
    next: createErrorObject(nextModel, vuelidate.nextModel),
    v$,
  };
};
