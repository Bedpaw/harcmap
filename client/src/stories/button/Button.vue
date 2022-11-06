<template>
  <button
    :class="classes"
    :variant="variant"
    :label="label"
    :type="type"
    :disabled="disabled"
    :onClick="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import './button.scss';
import { computed } from 'vue';

type ComponentProps = {
  variant: 'primary' | 'secondary';
  label: string;
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
}

const props = withDefaults(defineProps<ComponentProps>(), {
  variant: 'primary',
  label: 'Submit',
  type: 'button',
  disabled: false,
});

const emit = defineEmits(['click']);

const classes = computed(() => ({
  'storybook-button': true,
  'storybook-button--primary': props.variant === 'primary',
  'storybook-button--secondary': props.variant !== 'primary',
}));
</script>
