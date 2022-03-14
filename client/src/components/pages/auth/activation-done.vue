<template>
  <t-page class="f-text-center">
    <div class="f-py-2">
      <div class="f-bold">
        {{ $t('page.activationDone.main') }}
      </div>
    </div>
    <a-button-primary @click="$router.push({ path: ROUTES.signIn.path, query: { invitationKey } })">
      {{ $t('form.button.goToLogin') }}
    </a-button-primary>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import AButtonPrimary from 'atoms/button/primary';
import { onMounted, ref } from 'vue';
import { urlUtils } from 'utils/url';

export default {
  name: 'p-activation-done',
  components: {
    TPage,
    AButtonPrimary,
  },
  setup () {
    const invitationKey = ref('');

    onMounted(() => {
      invitationKey.value = urlUtils.getInvitationKey();
    });

    return {
      invitationKey,
    };
  },
};
</script>
