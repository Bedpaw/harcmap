import useVuelidate from '@vuelidate/core';
import { SetupContext, Ref } from 'vue';
import { DoubleModelRefs, DoubleModelRules, RulesList, ValidationProps } from 'models/validation';
import {
  createErrorObject,
  touchFieldOnChange,
  undefinedDoubleVuelidate,
  validationRulesListToConfig,
} from 'plugins/validation/utils';

export const useDoubleFieldValidation = (props:ValidationProps, context:SetupContext, first:[Ref<string>, RulesList], next:[Ref<string>, RulesList]) => {
  const [firstModel, firstRules] = first;
  const [nextModel, nextRules] = next;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const v$ = useVuelidate<DoubleModelRules, DoubleModelRefs>(
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      firstModel: validationRulesListToConfig([...props.rules, ...(firstRules || [])]),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
