import useVuelidate from '@vuelidate/core';
import { SetupContext, Ref } from 'vue';
import { RulesList, ValidationProps } from 'models/validation';
import {
  createErrorObject,
  touchFieldOnChange,
  undefinedDoubleVuelidate,
  validationRulesListToConfig,
} from 'plugins/validation/utils';

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

  touchFieldOnChange(firstModel, vuelidate.firstModel);
  touchFieldOnChange(nextModel, vuelidate.nextModel);

  return {
    first: createErrorObject(firstModel, vuelidate.firstModel),
    next: createErrorObject(nextModel, vuelidate.nextModel),
    v$,
  };
};
