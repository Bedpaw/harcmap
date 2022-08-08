<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="admin"
      :description="$t('page.admin.shareEvent.admin')"
      :event-invitation="eventShareCodes.admin"
      :event-invitation-link="eventShareLinks.admin"
    />
    <o-share-for-user-type
      type="teamLeader"
      :description="$t('page.admin.shareEvent.teamLeader')"
      :event-invitation="eventShareCodes.teamLeader"
      :event-invitation-link="eventShareLinks.teamLeader"
    />
    <o-share-for-user-type
      type="observer"
      :description="$t('page.admin.shareEvent.observer')"
      :event-invitation="eventShareCodes.observer"
      :event-invitation-link="eventShareLinks.observer"
    />
  </t-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TPage from 'templates/page.vue';
import OShareForUserType from 'organisms/share-for-user-type.vue';
import { ROUTES } from 'config/routes-config';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'p-admin-share-event',
  components: {
    OShareForUserType,
    TPage,
  },
  setup () {
    const store = useStore();
    const eventShareCodes = computed(() => store.getters['invitations/forShareEvent']);
    function generateLink (key:string) {
      return document.location.origin + ROUTES.invitation.path.replace(':key', key);
    }
    const eventShareLinks = computed(() => ({
      admin: generateLink(eventShareCodes.value.admin.key),
      observer: generateLink(eventShareCodes.value.observer.key),
      teamLeader: generateLink(eventShareCodes.value.teamLeader.key),
    }));

    return {
      ROUTES,
      eventShareCodes,
      eventShareLinks,
    };
  },
});
</script>
