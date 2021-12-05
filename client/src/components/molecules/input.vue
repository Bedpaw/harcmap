<template>
  <div class="m-input">
    <input
      :id="id"
      v-model="vModel"
      class="a-field"
      :class="additionalClasses"
      :type="getType"
      :disabled="disabled"
    >
    <label
      class="a-label f-field"
      :class="{ 'f-correct': correct, 'f-error': error }"
      :for="id"
    >
      {{ placeholder }}
    </label>
    <a-icon
      v-if="isPassword && showPassword === false"
      :name="$icons.names.visibility"
      class="f-input"
      @click="showPassword = true"
    />
    <a-icon
      v-if="isPassword && showPassword"
      :name="$icons.names.visibility_off"
      class="f-input"
      @click="showPassword = false"
    />
    <a-icon
      v-if="error && isPassword === false"
      :name="$icons.names.warning"
      class="f-input f-error"
    />
    <a-icon
      v-if="correct && isPassword === false && error === false"
      :name="$icons.names.check"
      class="f-input f-correct"
    />
    <div
      class="a-assist"
      :class="{ 'f-error': error, 'f-disabled': disabled}"
    >
      {{ assist }}
    </div>
  </div>
</template>

<script>
import { modelValueMixin, useModelValue } from 'plugins/v-model';
import { computed, onMounted, ref, toRefs } from 'vue';
import { fieldUidGenerator } from 'plugins/uid-generators';

export default {
  name: 'm-input',
  mixins: [modelValueMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    correct: {
      type: Boolean,
      default: false,
    },
    assist: {
      type: String,
      default: '',
    },
  },
  emits: ['blur'],
  setup (props, context) {
    const { vModel } = useModelValue(props, context);
    const { error, correct, disabled, type } = toRefs(props);

    const id = ref('');
    const showPassword = ref(false);

    const isPassword = computed(() => type.value === 'password');
    const additionalClasses = computed(() => ({
      'f-filled': vModel.value !== '',
      'f-error': error.value,
      'f-correct': correct.value,
      'f-icon': error.value || isPassword.value,
      'f-disabled': disabled.value,
    }));
    const getType = computed(() => {
      if (isPassword.value) {
        return showPassword.value ? '' : type.value;
      } else {
        return type.value;
      }
    });

    onMounted(() => (id.value = fieldUidGenerator.getNext()));

    return {
      vModel,
      id,
      showPassword,
      isPassword,
      additionalClasses,
      getType,
    };
  },
};
</script>
