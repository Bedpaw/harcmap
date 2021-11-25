<template>
  <label
    :for="id"
    :class="labelClass"
  >
    <input
      :id="id"
      v-model="vModel"
      class="a-checkbox"
      type="checkbox"
      :disabled="isDisabled"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
    >
    <a-icon
      :name="iconName"
      :type="$icons.types.outlined"
      :class="{'f-text-primary': hasFocus}"
    />
    <span class="f-pl-1 f-line-28">
      <slot />
    </span>
  </label>
</template>

<script>
import { modelValueMixin, useModelValue } from 'plugins/v-model';
import { computed, ref, toRefs } from 'vue';
import { useIcons } from '@dbetka/vue-material-icons';

export default {
  name: 'a-checkbox',
  mixins: [modelValueMixin],
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
