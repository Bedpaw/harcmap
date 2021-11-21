<template>
  <m-input
    type="password"
    v-model="vModel"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
  />
</template>

<script>
import MInput from 'molecules/input';
import { translator } from 'src/dictionary';
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation/field';
import { validationRules } from 'plugins/validation/rules';

export default {
  name: 'm-field-password',
  components: { MInput },
  props: {
    disabled: Boolean,
    label: {
      type: String,
      default: translator.t('form.field.password'),
    },
    assist: {
      type: String,
      default: '',
    },
  },
  mixins: [fieldValidationMixin],
  setup: (props, context) => ({
    ...useFieldValidation(props, context, {
      defaultRules: validationRules.password,
    }),
  }),
};
</script>
