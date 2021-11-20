<template>
  <m-input
    type="password"
    v-model="vModel"
    :disabled="disabled"
    :placeholder="labels[0]"
    :error="isError"
    :assist="errorMessage || assist[0]"
  />
  <m-input
    type="password"
    v-model="passwordConfirmation"
    :disabled="disabled"
    :placeholder="labels[1]"
    :error="isNextError"
    :assist="nextErrorMessage || assist[1]"
  />
</template>

<script>
import MInput from 'molecules/input';
import { translator } from 'src/dictionary';
import { fieldValidationMixin, useDoubleFieldValidation } from 'plugins/validation';
import { validationRules } from 'plugins/validation/rules';
import { ref, toRefs } from 'vue';

export default {
  name: 'm-field-set-password',
  components: { MInput },
  props: {
    disabled: Boolean,
    labels: {
      type: Array,
      default: () => [
        translator.t('form.field.password'),
        translator.t('form.field.rePassword'),
      ],
    },
    assist: {
      type: Array,
      default: () => ['', ''],
    },
  },
  mixins: [fieldValidationMixin],
  setup (props, context) {
    const { modelValue } = toRefs(props);
    const passwordConfirmation = ref('');
    return {
      passwordConfirmation,
      ...useDoubleFieldValidation(
        props,
        context,
        validationRules.password,
        [
          passwordConfirmation,
          validationRules.passwordConfirmation(modelValue),
        ],
      ),
    };
  },
};
</script>
