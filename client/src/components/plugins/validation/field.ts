import useVuelidate from '@vuelidate/core';
import { SetupContext } from 'vue';
import {
  createErrorObject,
  touchFieldOnChange,
  undefinedVuelidate,
  validationRulesListToConfig,
} from 'plugins/validation/utils';
import {
  ConfigFieldValidation,
  RulesList,
  ValidationProps,
  VModelRefs,
  VModelRules,
} from 'models/validation';
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const v$ = useVuelidate<VModelRules, VModelRefs>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { vModel: validationRulesListToConfig([...props.rules, ...(config.defaultRules || [])]) },
    { vModel },
  );
  const vuelidate = v$.value || undefinedVuelidate;

  touchFieldOnChange(vModel, vuelidate.vModel);
  const { error, message } = createErrorObject(vModel, vuelidate.vModel);

  return {
    vModel,
    v$,
    isError: error,
    errorMessage: message,
  };
};
