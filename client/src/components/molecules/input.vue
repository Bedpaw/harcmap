<template>
  <div class="m-input">
    <input
      :id="id"
      class="a-field"
      :class="additionalClasses"
      :type="getType"
      :disabled="disabled"
      v-model="vModel"
    />
    <label
      class="a-label f-field"
      :class="{ 'f-correct': correct, 'f-error': error }"
      :for="id"
    >
      {{ placeholder }}
    </label>
    <a-icon
      :name="$icons.names.visibility"
      v-if="isPassword && showPassword === false"
      class="f-input"
      @click="showPassword = true"
    />
    <a-icon
      :name="$icons.names.visibility_off"
      v-if="isPassword && showPassword"
      class="f-input"
      @click="showPassword = false"
    />
    <a-icon
      :name="$icons.names.warning"
      v-if="error && isPassword === false"
      class="f-input f-error"
    />
    <a-icon
      :name="$icons.names.check"
      v-if="correct && isPassword === false && error === false"
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

export default {
  name: 'm-input',
  emits: ['blur'],
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
  mixins: [modelValueMixin],
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

    onMounted(() => {
      // TODO: use JS generator
      const randomNumber = Math.floor(Math.random() * 10000);
      id.value = 'id-input-' + randomNumber;
    });

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
