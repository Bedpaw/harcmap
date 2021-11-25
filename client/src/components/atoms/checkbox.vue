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
import { modelValueMixin, useModelValue } from 'plugins/v-model';
import { computed, ref, toRefs } from 'vue';
import { useIcons } from '@dbetka/vue-material-icons';

export default {
  name: 'a-checkbox',
  props: {
    id: {
      type: [String, Number],
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [modelValueMixin],
  setup (props, context) {
    const { vModel } = useModelValue(props, context);
    const { isDisabled } = toRefs(props);
    const hasFocus = ref(false);

    const labelClass = computed(() => ({
      'f-flex': true,
      'f-disabled': isDisabled.value,
      'f-text-primary': hasFocus.value,
    }));

    const iconName = computed(() => {
      const iconsNames = useIcons().names;
      const checkedIcon = iconsNames.check_box;
      const uncheckedIcon = iconsNames.check_box_outline_blank;
      return vModel.value ? checkedIcon : uncheckedIcon;
    });

    return {
      vModel,
      hasFocus,
      labelClass,
      iconName,
    };
  },
};
</script>
