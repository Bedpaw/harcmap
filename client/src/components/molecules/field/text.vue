<template>
  <m-input
    type="text"
    v-model="vModel"
    :disabled="disabled"
    :placeholder="label"
    :error="v$.vModel.$silentErrors.length > 0"
    :assist="v$.vModel.$silentErrors[0]?.$message || assist"
  />
</template>

<script>
import useVuelidate from '@vuelidate/core';
import MInput from 'molecules/input';
import { mixins } from 'mixins/base';

export default {
  name: 'm-field-text',
  mixins: [mixins.vModel, mixins.fieldValidation],
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
    return {
      vModel: this.rulesObjects,
    };
  },
};
</script>
