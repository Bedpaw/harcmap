<template>
  <label :for="id" :class="labelClass">
    <input
      class="a-radio"
      type="radio"
      :checked="isChecked"
      @change="$emit('update:modelValue', $event.target.value)"
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
import { modelValueMixin, useModelValue } from 'plugins/v-model';
import { computed, ref, toRefs } from 'vue';
import { useIcons } from '@dbetka/vue-material-icons';

export default {
  name: 'a-radio',
  props: {
    id: {
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  mixins: [modelValueMixin],
  setup (props, context) {
    const { vModel } = useModelValue(props, context);
    const { isDisabled, value } = toRefs(props);
    const hasFocus = ref(false);

    const labelClass = computed(() => ({
      'f-flex': true,
      'f-disabled': isDisabled.value,
      'f-text-primary': hasFocus.value,
    }));
    const isChecked = computed(() => vModel.value === value.value);

    const iconName = computed(() => {
      const iconsNames = useIcons().names;
      const checkedIcon = iconsNames.radio_button_checked;
      const uncheckedIcon = iconsNames.radio_button_unchecked;
      return isChecked.value ? checkedIcon : uncheckedIcon;
    });

    return {
      vModel,
      hasFocus,
      isChecked,
      labelClass,
      iconName,
    };
  },
};
</script>
