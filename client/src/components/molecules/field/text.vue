<template>
  <m-input
    v-model="vModel"
    type="text"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
  />
</template>

<!-- USAGE EXAMPLE
  <m-field-text
    :label="$t('form.field.userTeam')"
    :rules="validationRules.userTeam"
    v-model.trim="values.userTeam"
    :disabled="blockForm"
    :assist="$t('form.assist.userTeam')"
  />
-->

<script>
import MInput from 'molecules/input';
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation/field';

export default {
  name: 'm-field-text',
  components: { MInput },
  mixins: [fieldValidationMixin],
  props: {
    disabled: Boolean,
    label: {
      type: String,
      default: '',
    },
    assist: {
      type: String,
      default: '',
    },
  },
  setup: (props, context) => ({
    ...useFieldValidation(props, context),
  }),
};
</script>
