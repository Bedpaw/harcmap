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
import { modelValueMixin, useModelValue } from 'mixins/setupBase';

export default {
  name: 'm-field-text',
  mixins: [
    modelValueMixin,
    mixins.fieldValidation(),
  ],
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
    rules: {
      type: Array,
      default: () => [],
    },
  },
  setup (props, context) {
    const { vModel } = useModelValue(props, context);

    return {
      vModel,
      v$: useVuelidate(),
    };
  },
  validations () {
    return { vModel: this.validationConfig };
  },
};
</script>
