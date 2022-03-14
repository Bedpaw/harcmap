<template>
  <m-input
    v-model.trim="vModel"
    type="email"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
    :tests-selector="testsSelector"
  />
</template>

<!-- USAGE EXAMPLE
  <m-field-email
    v-model="values.user"
    :disabled="blockForm"
  />
-->

<script>
import MInput from 'molecules/input';
import { translator } from 'src/dictionary';
import { validationRules } from 'plugins/validation/rules';
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation/field';

export default {
  name: 'm-field-email',
  components: { MInput },
  mixins: [fieldValidationMixin],
  props: {
    disabled: Boolean,
    label: {
      type: String,
      default: translator.t('form.field.email'),
    },
    assist: {
      type: String,
      default: '',
    },
    testsSelector: {
      type: String,
      default: 'input-email',
    },
  },
  setup: (props, context) => ({
    ...useFieldValidation(props, context, {
      defaultRules: validationRules.email,
    }),
  }),
};
</script>
