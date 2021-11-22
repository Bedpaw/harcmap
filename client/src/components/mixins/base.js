import { formMixin as form } from './form';

const vModel = {
  props: {
    modelValue: {},
  },
  computed: {
    vModel: {
      get () {
        return this.modelValue;
      },
      set (value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  emits: ['update:modelValue'],
};

export const mixins = {
  vModel,
  form,
};
