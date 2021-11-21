import useVuelidate from '@vuelidate/core';
import { computed, SetupContext, watch } from 'vue';
import { undefinedVuelidate, validationRulesListToConfig } from 'plugins/validation/utils';
import { ConfigFieldValidation, RulesList, ValidationProps } from 'models/validation';
import { modelValueMixin, useModelValue } from 'plugins/v-model';

export const fieldValidationMixin = {
  mixins: [modelValueMixin],
  props: {
    rules: {
      type: Array,
      default: ():RulesList => [],
    },
  },
};

export const useFieldValidation = (props: ValidationProps, context: SetupContext, config: ConfigFieldValidation = {}) => {
  const vModel = config.vModel ? config.vModel : useModelValue(props, context).vModel;

  const v$ = useVuelidate(
    { vModel: validationRulesListToConfig([...props.rules, ...(config.defaultRules || [])]) },
    { vModel },
  );
  const vuelidate = v$.value || undefinedVuelidate;

  watch(vModel, () => vuelidate.vModel.$touch());
  const isError = computed(() => vuelidate.vModel.$error);
  const errorMessage = computed(() => vuelidate.vModel.$errors[0]?.$message || '');

  return {
    vModel,
    v$,
    isError,
    errorMessage,
  };
};
