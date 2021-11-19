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
import useVuelidate from '@vuelidate/core';
import MInput from 'molecules/input';
import { mixins } from 'mixins/base';

export default {
  name: 'm-field-text',
  mixins: [
    mixins.vModel,
    mixins.fieldValidation(),
  ],
  components: { MInput },
  setup () {
    return { v$: useVuelidate() };
  },
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
  validations () {
    return { vModel: this.validationConfig };
  },
};
</script>
