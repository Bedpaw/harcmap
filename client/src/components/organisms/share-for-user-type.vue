<template>
  <div class="f-pb-3 f-text-bold">
    {{ description }}
  </div>
  <m-field-text
    label="Kod do wydarzenia"
    :model-value="eventShareCode"
    disabled
  />
  <m-field-text
    label="Link do wydarzenia"
    :model-value="eventShareLink"
    disabled
  />
  <div class="f-pb-3">
    <a-button-primary
      :disabled="isNotMobileDevice"
      @click="shareEvent()"
    >
      Udostępnij poprzez aplikacje
    </a-button-primary>

    <span
      v-if="isNotMobileDevice && sharingError === false"
      class="a-assist"
    >
      Dostępne tylko dla urządzeń mobilnych
    </span>

    <span
      v-if="sharingError"
      class="a-assist f-error"
    >
      Wystąpił błąd podczas próby udostępnienia. <br>
      Proszę skorzystać z linku powyżej.
    </span>

    <div v-if="thanksPopupOpened">
      Thanks for sharing!
    </div>
  </div>
</template>

<script>
import MFieldText from 'molecules/field/text';
import AButtonPrimary from 'atoms/button/primary';
import { translator } from 'dictionary';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'o-share-for-user-type',
  components: { AButtonPrimary, MFieldText },
  props: {
    description: { type: String, required: true },
    eventShareCode: { type: String, required: true },
    eventShareLink: { type: String, required: true },
  },
  setup (props) {
    const store = useStore();

    const isMobileDevice = ref(false);
    const isNotMobileDevice = computed(() => isMobileDevice.value === false);
    const sharingError = ref(false);
    const thanksPopupOpened = ref(false);

    onMounted(() => {
      if (navigator.share) {
        isMobileDevice.value = true;
      }
    });

    const shareEvent = () => {
      const eventName = store.getters['event/eventName'];

      isMobileDevice.value && navigator.share({
        title: translator.t('page.admin.shareEvent.joinToEventMessage', { eventName }),
        url: props.eventShareLink,
      })
        .then(() => (thanksPopupOpened.value = true))
        .catch(() => (sharingError.value = true));
    };

    return {
      isNotMobileDevice,
      sharingError,
      thanksPopupOpened,
      shareEvent,
    };
  },
};
</script>
