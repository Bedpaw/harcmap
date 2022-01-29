<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="teamMember"
      :description="$t('page.admin.shareEvent.teamMember')"
      :event-share-code="eventShareCodes.teamMember"
      :event-share-link="eventShareLinks.teamMember"
    />
  </t-page>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import TPage from 'templates/page.vue';
import OShareForUserType from 'organisms/share-for-user-type.vue';
import { ROUTES } from 'config/routes-config';

export default defineComponent({
  name: 'p-share-team',
  components: {
    OShareForUserType,
    TPage,
  },
  setup () {
    const eventShareCodes = reactive({
      teamMember: 'K8k4',
    });
    const linkBegin = document.location.origin + ROUTES.signUp.path + '/';
    const eventShareLinks = computed(() => ({
      teamMember: linkBegin + eventShareCodes.teamMember,
    }));

    return {
      ROUTES,
      eventShareCodes,
      eventShareLinks,
    };
  },
});
</script>
