<template>
  <m-input
    type="text"
    v-model="vModel"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
  />
</template>

<script>
import MInput from 'molecules/input';
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation/field';

export default {
  name: 'm-field-text',
  components: { MInput },
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
  mixins: [fieldValidationMixin],
  setup: (props, context) => ({
    ...useFieldValidation(props, context),
  }),
};
</script>
