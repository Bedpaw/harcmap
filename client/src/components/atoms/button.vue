<template>
  <div
    class="m-area f-button"
    :class="addAreaClass"
    @click.stop="emitClick($event)"
  >
    <button
      ref="button"
      class="a-button"
      :class="getClass"
      :type="type"
      :disabled="disabled"
    >
      <slot v-if="loading === false" />
      <a-loader
        v-if="loading"
        :add-class="addClass"
        :img="loadingImg"
      />
    </button>
  </div>
</template>

<script>
import ALoader from 'atoms/loader';

export default {
  name: 'a-button',
  components: { ALoader },
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    addClass: {
      type: [Array, String],
      default: '',
    },
    addAreaClass: {
      type: [Array, String],
      default: '',
    },
    loadingImg: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  emits: ['click'],
  computed: {
    getClass () {
      const classes = [this.addClass];

      if (this.loading) {
        classes.push('f-loading');
      }

      return classes;
    },
  },
  methods: {
    emitClick (event) {
      if (this.disabled === false) {
        this.$emit('click', event);
      }
    },
  },
};
</script>
