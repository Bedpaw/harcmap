<template>
  <label :for="id" :class="labelClass">
    <input
      class="a-radio"
      type="radio"
      :checked="isChecked"
      @change="$emit('change', $event.target.value)"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
      :value="value"
      :id="id"
      :disabled="isDisabled"
    />
    <a-icon
      :name="iconName"
      :class="{'f-text-primary': hasFocus}"
    ></a-icon>
    <span class="f-pl-1 f-line-28">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { mixins } from 'mixins/base';
import { materialIcons } from '@dbetka/vue-material-icons';

const ICONS = materialIcons.names;

export default {
  name: 'a-radio',
  mixins: [mixins.vModelRadio],
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
      const checkedIcon = ICONS.radio_button_checked;
      const uncheckedIcon = ICONS.radio_button_unchecked;
      return this.isChecked ? checkedIcon : uncheckedIcon;
    },
  },
};
</script>
