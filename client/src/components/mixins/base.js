import { vueModel, vueModelCheckbox } from 'extends/base';
import { formMixin as form } from './form';
import { validationMixin as validation } from './validation';

const vModel = {
  props: {
    value: {},
  },
  computed: {
    vModel: vueModel,
  },
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
  validation,
};
