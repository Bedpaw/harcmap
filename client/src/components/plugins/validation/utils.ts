import type { ValidationRuleWithParams } from '@vuelidate/core';
import type { RulesList } from 'models/validation';

export const undefinedVuelidate = {
  vModel: {
    $touch: ():void => undefined,
    $error: '',
    $errors: [{ $message: '' }],
  },
  nextValue: {
    $touch: ():void => undefined,
    $error: '',
    $errors: [{ $message: '' }],
  },
};

export function validationRulesListToConfig (rulesList: RulesList) {
  const object: {[index: string]:ValidationRuleWithParams} = {};
  for (const rule of rulesList) {
    object[rule.$params.type] = rule;
  }
  return object;
}
