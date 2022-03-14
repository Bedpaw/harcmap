<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="admin"
      :description="$t('page.admin.shareEvent.admin')"
      :event-share-code="eventShareCodes.admin"
      :event-share-link="eventShareLinks.admin"
    />
    <o-share-for-user-type
      type="teamLeader"
      :description="$t('page.admin.shareEvent.teamLeader')"
      :event-share-code="eventShareCodes.teamLeader"
      :event-share-link="eventShareLinks.teamLeader"
    />
    <o-share-for-user-type
      type="observer"
      :description="$t('page.admin.shareEvent.observer')"
      :event-share-code="eventShareCodes.observer"
      :event-share-link="eventShareLinks.observer"
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
      admin: generateLink(eventShareCodes.value.admin),
      observer: generateLink(eventShareCodes.value.observer),
      teamLeader: generateLink(eventShareCodes.value.teamLeader),
    }));

    return {
      ROUTES,
      eventShareCodes,
      eventShareLinks,
    };
  },
});
</script>
