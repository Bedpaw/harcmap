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
      :type="$icons.types.outlined"
      :class="{'f-text-primary': hasFocus}"
    ></a-icon>
    <span class="f-pl-1 f-line-28">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { mixins } from 'mixins/base';

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
      const checkedIcon = this.$icons.names.check_box;
      const uncheckedIcon = this.$icons.names.check_box_outline_blank;
      return this.checked ? checkedIcon : uncheckedIcon;
    },
  },
};
</script>
