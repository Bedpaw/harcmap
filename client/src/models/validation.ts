import { ValidationRuleWithParams } from '@vuelidate/core';
import { Ref } from '@vue/reactivity';

export type RulesList = Array<ValidationRuleWithParams<{ type:string }>>

export type ValidationProps = {
  modelValue: Ref
  rules: RulesList
}

export type ConfigFieldValidation = {
  defaultRules?: RulesList
  vModel?: Ref
}
