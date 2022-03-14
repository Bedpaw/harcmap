<template>
  <t-page>
    <div class="f-line-24 f-text-28 f-bold f-text-center f-mb-2">
      {{ teamName }}
    </div>
    <div class="f-text-22 f-text-center f-mb-5">
      {{ $t('page.teamView.mainHeaderPartOne') }}
      <span class="f-bold">{{ sumOfCollectedPoints }}</span>
      {{ $t('page.teamView.mainHeaderPartTwo') }}
    </div>
    <div class="f-line-24">
      <div class="a-text f-title f-table f-mb-2">
        {{ $t('page.teamView.membersHeader') }}
      </div>
      <div class="m-row f-header f-team-view">
        <div>{{ $t('page.teamView.role') }}</div>
        <div>{{ $t('page.teamView.nickname') }}</div>
        <div>{{ $t('page.teamView.email') }}</div>
      </div>
      <div
        v-for="user in teamMembersOrdered"
        :key="user.userId"
        class="m-grid f-team-view"
      >
        <m-row-team-row :user="user" />
      </div>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import MRowTeamRow from 'molecules/table-row/team-row';
import { userUtils } from 'config/users-config';
import { mapGetters } from 'vuex';

export default {
  name: 'p-team-view',
  components: {
    MRowTeamRow,
    TPage,
  },
  computed: {
    ...mapGetters('team', ['sumOfCollectedPoints', 'teamMembers', 'teamName']),
    teamMembersOrdered () {
      return userUtils.getOrderedMembers(this.teamMembers);
    },
  },
};
</script>
