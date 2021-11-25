<template>
  <m-textarea
    type="text"
    v-model="vModel"
    :disabled="disabled"
    :placeholder="label"
    :error="isError"
    :assist="errorMessage || assist"
  />
</template>

<script>
import { fieldValidationMixin, useFieldValidation } from 'plugins/validation/field';
import MTextarea from 'molecules/textarea';

export default {
  name: 'm-field-textarea',
  components: { MTextarea },
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
