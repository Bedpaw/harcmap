<template>
  <t-page title="">
    <div class="a-img f-map-round" />
    <div class="m-collection f-button">
      <a-button-primary @click="goTo(ROUTES.signIn.path)">
        {{ ROUTES.signIn.label }}
      </a-button-primary>
      <a-button-secondary @click="goTo(ROUTES.signUp.path)">
        {{ ROUTES.signUp.label }}
      </a-button-secondary>
      <a-button-secondary @click="goTo(ROUTES.about.path)">
        {{ ROUTES.about.label }}
      </a-button-secondary>
    </div>
  </t-page>
</template>

<script lang="ts">
import TPage from 'templates/page.vue';
import AButtonPrimary from 'atoms/button/primary.vue';
import AButtonSecondary from 'atoms/button/secondary.vue';
import { defineComponent } from 'vue';
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
    function goTo (path:string) {
      return router.push(path);
    }
    return {
      goTo,
      ROUTES,
    };
  },
});
</script>
