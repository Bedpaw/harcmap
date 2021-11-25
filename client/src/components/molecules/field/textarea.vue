<template>
  <m-textarea
    v-model="vModel"
    type="text"
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
