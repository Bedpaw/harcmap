<template>
  <form
    class="f-flex f-flex-col f-pb-1 f-text-left"
    @submit.prevent="handleSubmit"
  >
    <slot v-if="isSend === false"/>
    <slot name="form" v-if="isSend === false"/>
    <slot v-else name="response"/>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { store } from 'store';

export default {
  name: 'o-form',
  setup () {
    return { v$: useVuelidate() };
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => undefined,
    },
    isSend: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmit () {
      if (this.v$.$silentErrors.length === 0) {
        this.onSubmit();
      } else {
        store.dispatch('snackbar/openTemporary', {
          message: 'Wypełnij formularz poprawnie',
          error: true,
        });
      }
    },
  },
};
</script>
