<template>
  <t-start>
    <template #buttons>
      <template v-if="userUtils.can.seeAdminStartView()">
        <a-button-fill-primary
          :text="$t('page.admin.start.checkScoreboard')"
          @click="$router.push(ROUTES.scoreboard.path)"
        />
        <a-button-fill-secondary
          v-if="checkIsNotLimited()"
          :text="$t('page.admin.start.editEvent')"
          @click="$router.push(ROUTES.editEvent.path)"
        />
        <a-button-fill-secondary
          v-else
          :text="ROUTES.searchPoint.label"
          @click="$router.push(ROUTES.searchPoint.path)"
        />
      </template>

      <template v-else>
        <a-button-fill-primary
          :text="$t('page.start.search')"
          @click="$router.push(ROUTES.map.path)"
        />
        <a-button-fill-secondary
          :text="$t('page.start.checkResults')"
          @click="$router.push(ROUTES.collectedPoints.path)"
        />
      </template>
    </template>
  </t-start>
</template>

<script>
import AButtonFillSecondary from 'atoms/button/fill/secondary';
import AButtonFillPrimary from 'atoms/button/fill/primary';
import TStart from 'templates/start';
import { userUtils } from 'config/users-config';

export default {
  name: 'p-start',
  components: {
    TStart,
    AButtonFillPrimary,
    AButtonFillSecondary,
  },
  data: () => ({
    userUtils,
  }),
};
</script>
