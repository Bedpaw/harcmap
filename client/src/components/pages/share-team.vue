<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="teamMember"
      :description="$t('page.shareEvent.teamMember')"
      :event-share-code="teamShareCodes.teamMember"
      :event-share-link="teamShareLinks.teamMember"
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
  name: 'p-share-team',
  components: {
    OShareForUserType,
    TPage,
  },
  setup () {
    const store = useStore();

    const teamShareCodes = computed(() => store.getters['invitations/forShareTeam']);
    function generateLink (key:string) {
      return document.location.origin + ROUTES.invitation.path.replace(':key', key);
    }
    const teamShareLinks = computed(() => ({
      teamMember: generateLink(teamShareCodes.value.teamMember),
    }));

    return {
      ROUTES,
      teamShareCodes,
      teamShareLinks,
    };
  },
});
</script>
