import type { ValidationRuleWithParams } from '@vuelidate/core';
import type { RulesList } from 'models/validation';

const vuelidateField = () => ({
  $touch: ():void => undefined,
  $error: '',
  $errors: [{ $message: '' }],
});

export const undefinedVuelidate = {
  vModel: vuelidateField(),
};

export const undefinedDoubleVuelidate = {
  firstModel: vuelidateField(),
  nextModel: vuelidateField(),
};

export function validationRulesListToConfig (rulesList: RulesList) {
  const object: {[index: string]:ValidationRuleWithParams} = {};
  for (const rule of rulesList) {
    object[rule.$params.type] = rule;
  }
  return object;
}
