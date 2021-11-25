import { ValidationRuleWithParams } from '@vuelidate/core';
import { Ref } from '@vue/reactivity';

export type ValidationRuleWithType = ValidationRuleWithParams<{ type:string }>

export type RulesList = Array<ValidationRuleWithType>

export type ValidationProps = {
  modelValue: Ref
  rules: RulesList
}

export type ConfigFieldValidation = {
  defaultRules?: RulesList
  vModel?: Ref
}

export type VuelidateVModelType = {
  $touch: () => void
  $error: string
  $errors: { $message: string|undefined }[]
}
