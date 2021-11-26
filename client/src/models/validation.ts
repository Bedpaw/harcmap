import { ErrorObject, ValidationRuleWithParams } from '@vuelidate/core';
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
  $error: boolean
  $errors: ErrorObject[]
}

export type VModelRules = {
  vModel: {
    [index: string]: ValidationRuleWithType
  }
}

export type VModelRefs = {
  vModel: Ref<string>
}

export type DoubleModelRules = {
  firstModel: {
    [index: string]: ValidationRuleWithType
  }
  nextModel: {
    [index: string]: ValidationRuleWithType
  }
}

export type DoubleModelRefs = {
  firstModel: Ref<string>
  nextModel: Ref<string>
}
