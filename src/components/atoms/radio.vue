<template>
  <label :for="id">
    <input
      class="a-radio"
      type="radio"
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
  name: 'a-radio',
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
