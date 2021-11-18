<template>
  <t-page>
    <div class="a-text f-line-24 f-title f-menu f-text-center f-mb-2">{{ teamName }}</div>
    <div class="a-message f-text-22 f-text-center f-mb-5">
      {{$t('page.teamView.mainHeaderPartOne')}}
      <span class="f-bold">{{ collectedPoints }}</span>
      {{$t('page.teamView.mainHeaderPartTwo')}}
    </div>
    <div class="f-line-24">
      <div class="a-text f-title f-table f-mb-2">{{$t('page.teamView.membersHeader')}}</div>
      <div class="m-row f-header f-team-view">
        <div>{{$t('page.teamView.role')}}</div>
        <div>{{$t('page.teamView.nickname')}}</div>
        <div>{{$t('page.teamView.email')}}</div>
      </div>
      <div class="m-grid f-team-view"
           v-for="user in teamMembersOrdered"
           :key="user.userId"
      >
        <m-row-team-row :user="user"
        ></m-row-team-row>
      </div>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import MRowTeamRow from 'molecules/table-row/team-row';
import { userUtils } from 'config/users-config';

export default {
  name: 'p-team-view',
  components: {
    MRowTeamRow,
    TPage,
  },
  data: () => ({
    teamName: 'Team rzodkiewka',
    collectedPoints: '4200',
    teamMembers: [
      {
        email: 'andrew@demo.com',
        nickname: 'Andrzeju',
        userId: '1',
        accountType: 'userObserver',
      },
      {
        email: 'andrew@demo.com',
        nickname: 'nie',
        userId: '2',
        accountType: 'common',
      },
      {
        email: 'andrew@demo.com',
        nickname: 'denerwuj',
        userId: '3',
        accountType: 'userObserver',
      },
      {
        email: 'andrew@demo.com',
        nickname: 'sie',
        userId: '4',
        accountType: 'userObserver',
      },
    ],
  }),
  computed: {
    teamMembersOrdered () {
      return userUtils.getOrderedMembers(this.teamMembers);
    },
  },
};
</script>
