<template>
  <div
    class="f-flex"
    @click="showDetails()"
  >
    <div class="f-flex-1 f-flex f-flex-al-center f-text-bold f-text-left">
      <a-icon
        :name="getCurrentIcon"
        outlined
        size="40"
      />
      <span class="f-flex-1 f-pl-2">{{ description }}</span>
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
      :text="'Kod zaproszenia'"
      add-area-class="f-mt-0"
    />
    <a-button-copy
      :text-to-copy="eventShareLink"
      :text="'Link zaproszenia'"
      add-area-class="f-mt-0"
    />
    <div class="f-pb-3">
      <a-button-primary
        add-area-class="f-mt-0"
        :disabled="isNotMobileDevice"
        @click="shareEvent()"
      >
        Udostępnij przez aplikacje
      </a-button-primary>

      <div
        v-if="isNotMobileDevice"
        class="a-assist f-button"
      >
        Dostępne tylko na urządzeniach mobilnych
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import AButtonPrimary from 'atoms/button/primary.vue';
import { translator } from 'dictionary';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { useStore } from 'vuex';
import AButtonCopy from 'atoms/button/copy.vue';
import { USERS_DEFAULT_CONFIG } from 'config/users-config';
import { AccountTypesStringType } from 'utils/permissions';

export default defineComponent({
  name: 'o-share-for-user-type',
  components: { AButtonCopy, AButtonPrimary },
  props: {
    rolledUp: { type: Boolean, default: false },
    description: { type: String, required: true },
    eventShareCode: { type: String, required: true },
    eventShareLink: { type: String, required: true },
    type: { type: String as PropType<AccountTypesStringType>, required: true },
  },
  setup (props) {
    const store = useStore();

    const isMobileDevice = ref(false);
    const isNotMobileDevice = computed(() => isMobileDevice.value === false);
    const detailsVisible = ref(props.rolledUp === false);
    const accountTypeInfo = USERS_DEFAULT_CONFIG.accountTypeInfo;

    const getCurrentIcon = computed(() => {
      return accountTypeInfo[props.type].icon;
    });

    onMounted(() => {
      if (navigator.share !== undefined) {
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
      getCurrentIcon,
      isNotMobileDevice,
      detailsVisible,
      showDetails,
      shareEvent,
    };
  },
});
</script>
