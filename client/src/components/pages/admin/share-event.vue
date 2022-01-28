<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="admin"
      :description="$t('page.admin.shareEvent.admin')"
      :event-share-code="eventShareCodes.adminObserver"
      :event-share-link="eventShareLinks.adminObserver"
    />
    <o-share-for-user-type
      type="observer"
      :description="$t('page.admin.shareEvent.observer')"
      :event-share-code="eventShareCodes.adminObserver"
      :event-share-link="eventShareLinks.adminObserver"
    />
    <o-share-for-user-type
      type="teamLeader"
      :description="$t('page.admin.shareEvent.teamLeader')"
      :event-share-code="eventShareCodes.teamLeader"
      :event-share-link="eventShareLinks.teamLeader"
    />
  </t-page>
</template>

<script>
import { computed, reactive } from 'vue';
import TPage from 'templates/page';
import OShareForUserType from 'organisms/share-for-user-type';
import { ROUTES } from 'config/routes-config';

export default {
  name: 'p-admin-share-event',
  components: {
    OShareForUserType,
    TPage,
  },
  setup () {
    const eventShareCodes = reactive({
      teamLeader: 'dj4G',
      adminObserver: 'Gde5',
    });
    const linkBegin = document.location.origin + ROUTES.signUp.path + '/';
    const eventShareLinks = computed(() => ({
      teamLeader: linkBegin + eventShareCodes.teamLeader,
      adminObserver: linkBegin + eventShareCodes.adminObserver,
    }));

    return {
      ROUTES,
      eventShareCodes,
      eventShareLinks,
    };
  },
};
</script>
