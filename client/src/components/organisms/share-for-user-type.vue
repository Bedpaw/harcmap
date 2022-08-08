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
      :text-to-copy="eventInvitation.key"
      :text="$t('page.shareEvent.button.invitationKey')"
      add-area-class="f-mt-0"
    />
    <a-button-copy
      :text-to-copy="eventInvitationLink"
      :text="$t('page.shareEvent.button.invitationURL')"
      add-area-class="f-mt-0"
    />
    <div>
      <a-button-primary
        v-if="isShareAvailable"
        add-area-class="f-mt-0"
        @click="shareEvent()"
      >
        {{ $t('page.shareEvent.button.shareByApp') }}
      </a-button-primary>
    </div>
    <a-button-primary
      v-if="resetAvailable"
      add-area-class="f-mt-0 f-pb-3"
      add-class="f-bg-danger"
      @click="resetInvitation()"
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
import { Share } from '@capacitor/share';
import { MOBILE_TARGET } from 'src/index';
import { SingleInvitationKey } from 'models/invitations';

export default defineComponent({
  name: 'o-share-for-user-type',
  components: { AButtonCopy, AButtonPrimary },
  props: {
    rolledUp: { type: Boolean, default: false },
    description: { type: String, required: true },
    eventInvitation: { type: Object as PropType<SingleInvitationKey>, required: true },
    eventInvitationLink: { type: String, required: true },
    resetAvailable: { type: Boolean, default: true },
    type: { type: String as PropType<AccountTypesStringType>, required: true },
  },
  setup (props) {
    const store = useStore();

    const isMobile = MOBILE_TARGET();
    const isAppShare = ref(false);
    const isWebShare = ref(false);

    const isShareAvailable = ref(false);
    const detailsVisible = ref(props.rolledUp === false);
    const accountTypeInfo = USERS_DEFAULT_CONFIG.accountTypeInfo;

    const getCurrentIcon = computed(() => {
      return accountTypeInfo[props.type].icon;
    });

    onMounted(async () => {
      const appShareAvailable = (await Share.canShare()).value;
      const webShareAvailable = navigator.share !== undefined;

      isAppShare.value = isMobile && appShareAvailable;
      isWebShare.value = isMobile === false && webShareAvailable;

      if (isAppShare.value || isWebShare.value) {
        isShareAvailable.value = true;
      }
    });

    async function shareEvent () {
      const eventName = store.getters['event/eventName'];
      const title = translator.t('page.shareEvent.joinToEventMessage', { eventName });
      const url = props.eventInvitationLink;

      isAppShare.value && Share.share({ title, dialogTitle: title, text: title, url })
        .catch(console.error);

      isWebShare.value && navigator.share({ title, url })
        .catch(console.error);
    }

    async function resetInvitation () {
      const keyId = props.eventInvitation.keyId;
      return await store.dispatch('invitations/resetInvitation', keyId);
    }

    function showDetails () {
      if (props.rolledUp) {
        detailsVisible.value = detailsVisible.value === false;
      }
    }

    return {
      getCurrentIcon,
      isShareAvailable,
      detailsVisible,
      showDetails,
      shareEvent,
      resetInvitation,
    };
  },
});
</script>
