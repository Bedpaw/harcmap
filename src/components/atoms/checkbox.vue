<template>
  <label :for="id">
    <input
      class="a-checkbox"
      type="checkbox"
      :id="id"
      :checked="shouldBeChecked"
      :value="value"
      :disabled="isDisabled"
      @change="updateInput"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'a-checkbox',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: '',
    },
    id: {
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    shouldBeChecked () {
      return this.modelValue === this.value;
    },
  },
  methods: {
    updateInput () {
      this.$emit('change', this.value);
    },
  },
};
</script>
