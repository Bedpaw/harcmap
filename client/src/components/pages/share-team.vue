<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="teamMember"
      :description="$t('page.shareEvent.teamMember')"
      :event-invitation="teamShareCodes.teamMember"
      :event-invitation-link="teamShareLinks.teamMember"
      :reset-available="false"
    />
  </t-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TPage from 'templates/page.vue';
import OShareForUserType from 'organisms/share-for-user-type.vue';
import { ROUTES } from 'config/routes-config';
import { useStore } from 'vuex';
import { API_URL } from 'config/app-env';

export default defineComponent({
  name: 'p-share-team',
  components: {
    OShareForUserType,
    TPage,
  },
  setup () {
    const store = useStore();

    const teamShareCodes = computed(() => store.getters['invitations/forShareTeam']);
    function generateLink (key:string) {
      const origin = API_URL || document.location.origin;
      return origin + ROUTES.invitation.path.replace(':key', key);
    }
    const teamShareLinks = computed(() => ({
      teamMember: generateLink(teamShareCodes.value.teamMember.key),
    }));

    return {
      ROUTES,
      teamShareCodes,
      teamShareLinks,
    };
  },
});
</script>
