<template>
  <label :for="id">
    <input
      class="a-checkbox"
      type="checkbox"
      :id="id"
      :checked="value"
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
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Boolean,
    },
    id: {
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateInput () {
      this.$emit('change', this.value);
    },
  },
};
</script>
