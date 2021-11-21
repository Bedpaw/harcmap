import { computed, toRefs, SetupContext } from 'vue';

export const modelValueMixin = {
  props: {
    modelValue: {},
  },
  emits: ['update:modelValue'],
};

export const useModelValue = (props: Readonly<{ modelValue: {value:string} }>, context:SetupContext) => {
  const { modelValue } = toRefs(props);

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
