<template>
  <div
    class="f-text-bold f-flex f-text-18"
    @click="showDetails()"
  >
    <div class="f-flex-1">
      {{ description }}
    </div>
    <a-icon
      v-if="rolledUp"
      :name="$icons.names.arrow_drop_down"
      filled
    />
  </div>
  <template v-if="detailsVisible">
    <a-button-copy
      :text-to-copy="eventShareCode"
      :text="'Skopiuj kod wydarzenia'"
      add-area-class="f-mt-1"
    />
    <a-button-copy
      :text-to-copy="eventShareLink"
      :text="'Skopiuj link do wydarzenia'"
      add-area-class="f-mt-1"
    />
    <div class="f-pb-5">
      <a-button-primary
        add-area-class="f-mt-1"
        :disabled="isNotMobileDevice"
        @click="shareEvent()"
      >
        Udostępnij przez aplikacje
      </a-button-primary>

      <span
        v-if="isNotMobileDevice"
        class="a-assist"
      >
        Dostępne tylko na urządzeniach mobilnych
      </span>
    </div>
  </template>
</template>

<script>
import MFieldText from 'molecules/field/text';
import AButtonPrimary from 'atoms/button/primary';
import { translator } from 'dictionary';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AButtonCopy from 'atoms/button/copy';

export default {
  name: 'o-share-for-user-type',
  components: { AButtonCopy, AButtonPrimary, MFieldText },
  props: {
    rolledUp: { type: Boolean, default: false },
    description: { type: String, required: true },
    eventShareCode: { type: String, required: true },
    eventShareLink: { type: String, required: true },
  },
  setup (props) {
    const store = useStore();

    const isMobileDevice = ref(false);
    const isNotMobileDevice = computed(() => isMobileDevice.value === false);
    const detailsVisible = ref(props.rolledUp === false);

    onMounted(() => {
      if (navigator.share) {
        isMobileDevice.value = true;
      }
    });

    function shareEvent () {
      const eventName = store.getters['event/eventName'];

      isMobileDevice.value && navigator.share({
        title: translator.t('page.admin.shareEvent.joinToEventMessage', { eventName }),
        url: props.eventShareLink,
      })
        .catch(console.error);
    }

    function showDetails () {
      if (props.rolledUp) {
        detailsVisible.value = detailsVisible.value === false;
      }
    }

    return {
      isNotMobileDevice,
      detailsVisible,
      showDetails,
      shareEvent,
    };
  },
};
</script>
