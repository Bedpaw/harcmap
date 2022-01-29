<template>
  <t-page class="f-text-center">
    <o-share-for-user-type
      type="teamMember"
      :description="$t('page.admin.shareEvent.teamMember')"
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

    // Can't recognize invitation code for current team
    const teamShareCodes = computed(() => store.getters['invitations/forShareTeam']);
    const linkBegin = document.location.origin + ROUTES.signUp.path + '/';
    const teamShareLinks = computed(() => ({
      teamMember: linkBegin + teamShareCodes.value.teamMember,
    }));

    return {
      ROUTES,
      teamShareCodes,
      teamShareLinks,
    };
  },
});
</script>
