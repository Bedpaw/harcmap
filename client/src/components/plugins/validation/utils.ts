import type { ValidationRuleWithParams } from '@vuelidate/core';
import type { RulesList } from 'models/validation';
import { computed, Ref, watch } from 'vue';

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

type ModelObjectType = {
  $touch: () => void
  $error: string
  $errors: {$message: string|undefined}[]
}

export function touchFieldOnChange (field:Ref, model:ModelObjectType) {
  watch(field, () => model.$touch());
}

export function createErrorObject (field:Ref, model:ModelObjectType) {
  return ({
    ref: field,
    error: computed(() => model.$error),
    message: computed(() => model.$errors[0]?.$message || ''),
  });
}
