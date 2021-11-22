<template>
  <form
    class="f-flex f-flex-col f-pb-1 f-text-left"
    @submit.prevent="handleSubmit()"
  >
    <slot v-if="isSend === false"/>
    <slot name="form" v-if="isSend === false"/>
    <slot v-else name="response"/>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { store } from 'store';
import { toRefs } from 'vue';
import { translator } from 'dictionary';

export default {
  name: 'o-form',
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
  setup (props) {
    const v$ = useVuelidate();
    const { onSubmit } = toRefs(props);

    function handleSubmit () {
      if (v$.value.$invalid) {
        v$.value.$touch();
        store.dispatch('snackbar/openTemporary', {
          message: translator.t('correctForm'),
          error: true,
        });
      } else {
        onSubmit.value();
      }
    }

    return {
      handleSubmit,
      v$,
    };
  },
};
</script>
