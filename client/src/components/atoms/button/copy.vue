<template>
  <a-button-secondary
    :disabled="disabled"
    :add-class="'f-flex f-flex-just-center f-flex-al-center ' + doneClass + ' ' + errorClass"
    @click="copy()"
  >
    <a-icon
      class="f-mr-1"
      :name="$icons.names.copy_all"
      size="24"
      outlined
    />
    {{ message }}
  </a-button-secondary>
</template>

<script lang="ts">
import AButtonSecondary from 'atoms/button/secondary.vue';
import { computed, defineComponent, ref } from 'vue';
import { translator } from 'dictionary';

export default defineComponent({
  name: 'a-button-copy',
  components: { AButtonSecondary },
  props: {
    full: { type: Boolean, default: false },
    textToCopy: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: '' },
  },
  setup (props) {
    let timeoutIdForMessage = setTimeout(() => undefined);
    const showedMessage = ref(false);
    const showedError = ref(false);
    const doneClass = computed(() => showedMessage.value ? 'f-bg-primary' : '');
    const errorClass = computed(() => showedError.value ? 'f-bg-danger' : '');

    const message = computed(() => {
      if (showedError.value) return translator.t('general.errorAppear');
      if (showedMessage.value) return translator.t('general.copiedShort');

      return props.text;
    });

    function copy () {
      navigator.clipboard.writeText(props.textToCopy).then(
        () => {
          showedMessage.value = true;
          clearTimeout(timeoutIdForMessage);
          timeoutIdForMessage = setTimeout(() => {
            showedMessage.value = false;
          }, 1000);
        },
        () => {
          showedError.value = true;
        },
      );
    }

    return {
      copy,
      message,
      showedMessage,
      showedError,
      doneClass,
      errorClass,
    };
  },
});
</script>
