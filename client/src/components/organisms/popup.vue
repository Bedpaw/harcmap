<!-- TODO FIX IT -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-if="isOpen"
    class="m-cover f-popup"
    data-cy="popup"
    @click="$store.commit('popup/close')"
  >
    <div
      class="o-popup"
      :class="[classes]"
    >
      <a-icon-close-popup/>
      <div
        v-for="[key, message] of listOfMessages.entries()"
        :key="key"
        class="f-pb-1"
        :class="{ 'f-text-28 f-mb-1': key === 0 }"
        v-html="message"
      />
      <a-icon
        v-if="icon"
        :name="icon"
        class="f-mt-1"
        size="72"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AIconClosePopup from 'atoms/icon/close-popup';

export default {
  name: 'o-popup',
  components: { AIconClosePopup },
  computed: {
    ...mapGetters('popup', [
      'isOpen',
      'listOfMessages',
      'icon',
      'classes',
    ]),
  },
};
</script>
