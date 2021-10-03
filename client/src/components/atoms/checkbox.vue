<template>
  <label :for="id" :class="labelClass">
    <input
      class="a-checkbox"
      type="checkbox"
      v-model="vModel"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
      :id="id"
      :disabled="isDisabled"
    />
    <a-icon
      :name="iconName"
      :type="ICONS_TYPES.outlined"
      :class="{'f-text-primary': hasFocus}"
    ></a-icon>
    <span class="f-pl-1 f-line-28">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { mixins } from 'mixins/base';
import { ICONS } from '@dbetka/vue-material-icons';

export default {
  name: 'a-checkbox',
  mixins: [mixins.vModelCheckbox],
  data: () => ({
    hasFocus: false,
  }),
  props: {
    id: {
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelClass () {
      return {
        'f-flex': true,
        'f-disabled': this.isDisabled,
        'f-text-primary': this.hasFocus,
      };
    },
    iconName () {
      const checkedIcon = ICONS.check_box;
      const uncheckedIcon = ICONS.check_box_outline_blank;
      return this.checked ? checkedIcon : uncheckedIcon;
    },
  },
};
</script>
