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
      <span class="f-flex-1 f-ml-2">{{ description }}</span>
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
      :text="$t('page.shareEvent.button.invitationKey')"
      add-area-class="f-mt-0"
    />
    <a-button-copy
      :text-to-copy="eventShareLink"
      :text="$t('page.shareEvent.button.invitationURL')"
      add-area-class="f-mt-0"
    />
    <div>
      <a-button-primary
        add-area-class="f-mt-0"
        :disabled="isNotMobileDevice"
        @click="shareEvent()"
      >
        {{ $t('page.shareEvent.button.shareByApp') }}
      </a-button-primary>

      <div
        v-if="isNotMobileDevice"
        class="a-assist f-button"
      >
        {{ $t('page.shareEvent.button.shareByAppNotAvailable') }}
      </div>
    </div>
    <a-button-primary
      add-area-class="f-mt-0 f-pb-3"
      add-class="f-bg-danger"
      disabled
    >
      {{ $t('page.shareEvent.button.resetInvitation') }}
    </a-button-primary>
  </template>
</template>

<script lang="ts">
import AButtonPrimary from 'atoms/button/primary.vue';
import AButtonCopy from 'atoms/button/copy.vue';
import { translator } from 'dictionary';
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { useStore } from 'vuex';
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
        title: translator.t('page.shareEvent.joinToEventMessage', { eventName }),
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
