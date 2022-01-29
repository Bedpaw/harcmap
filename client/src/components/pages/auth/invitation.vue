<template>
  <t-page class="f-text-center">
    <div>Cześć!</div>
    <div>Zanim dołączysz do wydarzenia zaloguj się lub zarejestruj</div>
    <div class="m-collection f-button">
      <a-button-primary @click="$router.push(ROUTES.signIn.path)">
        {{ ROUTES.signIn.label }}
      </a-button-primary>
      <a-button-secondary @click="$router.push(ROUTES.signUp.path)">
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

    function goTo (path:string) {
      return router.push(path + '?invitationKey=' + invitationKey);
    }

    onMounted(() => {
      router.push(ROUTES.joinEvent.path + '?invitationKey=' + invitationKey);
    });

    return {
      goTo,
      ROUTES,
    };
  },
});
</script>
