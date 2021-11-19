import { computed, toRefs } from 'vue';

export const modelValueMixin = {
  props: {
    modelValue: {},
  },
  emits: ['update:modelValue'],
};

export const useModelValue = (props, context) => {
  const { modelValue } = toRefs(props);
  console.log('modelValue', modelValue);
  const vModel = computed({
    get () {
      return modelValue.value;
    },
    set (value) {
      context.emit('update:modelValue', value);
    },
  });

  return {
    vModel,
  };
};
