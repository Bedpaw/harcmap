<template>
  <input
    type="text"
    v-model="value"
    name="name"
    @input="updateValue"
  >
  <div>{{ errorMessage }}</div>
</template>

<script>
import { useField } from 'vee-validate';
import { defineProps, defineEmit } from 'vue';

export default {
  name: 'm-new-input',
  props: {
    modelValue: String,
  },
  setup () {
    const emit = defineEmit(['update:modelValue']);

    function updateValue (value) {
      emit('update:modelValue', value);
    }

    function isRequired (value) {
      if (value && value.trim()) {
        return true;
      }
      return 'This is required';
    }
    const { errorMessage, value } = useField('fieldName', isRequired);

    return {
      errorMessage,
      value,
      updateValue,
    };
  },
};
</script>
