<template>
  <t-page class="f-text-center">
    <div class="f-mb-1">
      {{ $t('general.hello') }}!
    </div>
    <div>{{ $t('page.invitation.welcomeInfo') }}</div>
    <div class="m-collection f-button">
      <a-button-primary @click="goToByName(ROUTES.signIn.name)">
        {{ ROUTES.signIn.label }}
      </a-button-primary>
      <a-button-secondary @click="goToByName(ROUTES.signUp.name)">
        {{ ROUTES.signUp.label }}
      </a-button-secondary>
    </div>
  </t-page>
</template>

<script lang="ts">
import TPage from 'templates/page.vue';
import AButtonPrimary from 'atoms/button/primary.vue';
import AButtonSecondary from 'atoms/button/secondary.vue';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTES } from 'config/routes-config';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'p-welcome',
  components: {
    AButtonSecondary,
    AButtonPrimary,
    TPage,
  },
  setup () {
    const router = useRouter();
    const invitationKey = router.currentRoute.value.params.key;

    function goToByName (name:string) {
      router.push({
        name,
        query: { invitationKey },
      });
    }

    onMounted(() => {
      const store = useStore();
      if (store.getters['user/isLogin']) {
        router.push({
          name: ROUTES.joinEvent.name,
          query: { invitationKey },
        });
      }
    });

    return {
      goToByName,
      ROUTES,
    };
  },
});
</script>
