import { vueModel, vueModelCheckbox } from 'extends/base';
import { formMixin as form } from './form';
import { validationRulesMixin as formValidation, validateMixin as fieldValidation } from './validation';

const vModel = {
  props: {
    modelValue: {},
  },
  computed: {
    vModel: vueModel,
  },
  emits: ['update:modelValue'],
};
const vModelCheckbox = {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {},
  },
  computed: {
    vModel: vueModelCheckbox,
  },
};

const vModelRadio = {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    modelValue: { default: '' },
    value: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    isChecked () {
      return this.modelValue === this.value;
    },
  },
};

export const mixins = {
  vModel,
  vModelRadio,
  vModelCheckbox,
  form,
  formValidation,
  fieldValidation,
};
