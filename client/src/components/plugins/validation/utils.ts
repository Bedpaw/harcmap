import type { RulesList, ValidationRuleWithType } from 'models/validation';
import type { Ref } from '@vue/reactivity';
import { computed, watch } from 'vue';
import { VuelidateVModelType } from 'models/validation';

const vuelidateField = () => ({
  $touch: ():void => undefined,
  $error: false,
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
  const object: {[index: string]:ValidationRuleWithType} = {};
  for (const rule of rulesList) {
    object[rule.$params.type] = rule;
  }
  return object;
}

export function touchFieldOnChange (field:Ref, model:VuelidateVModelType) {
  watch(field, () => model.$touch());
}

export function createErrorObject (field:Ref, model:VuelidateVModelType) {
  return ({
    ref: field,
    error: computed(() => model.$error),
    message: computed(() => model.$errors[0]?.$message || ''),
  });
}
