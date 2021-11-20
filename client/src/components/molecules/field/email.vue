<template>
  <m-input
    type="email"
    v-model.trim="vModel"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
  />
</template>

<script>
import MInput from 'molecules/input';
import { translator } from 'src/dictionary';
import { validationRules } from 'plugins/validation/rules';
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation';

export default {
  name: 'm-field-email',
  components: { MInput },
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
  },
  mixins: [fieldValidationMixin],
  setup: (props, context) => ({
    ...useFieldValidation(props, context, validationRules.email),
  }),
};
</script>
