<template>
  <t-page>
    <div class="a-text f-line-24 f-title f-menu f-text-center f-mb-2">{{ teamName }}</div>
    <div class="a-message f-text-22 f-text-center f-mb-5">
      {{$t('page.teamView.mainHeaderPartOne')}}
      <b> {{ teamPoints }} </b>
      {{$t('page.teamView.mainHeaderPartTwo')}}
    </div>
    <div class="f-line-24">
      <div class="a-text f-title f-table f-mb-2">{{$t('page.teamView.membersHeader')}}</div>
      <div class="m-row f-header f-team-view">
        <div>{{$t('page.teamView.nickname')}}</div>
        <div>{{$t('page.teamView.email')}}</div>
      </div>
      <div class="m-grid f-team-view"
           v-for="item in members"
           :key="item.id"
      >
        <m-row-team-row class="f-team-view"
                        :email="item.email"
                        :nickname="item.nickname"
        ></m-row-team-row>
      </div>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import MRowTeamRow from 'molecules/table-row/team-row';

export default {
  name: 'p-team-view',
  components: {
    MRowTeamRow,
    TPage,
  },
  data: () => ({
    teamName: 'Team rzodkiewka',
    teamPoints: 4200,
    members: [
      {
        id: 1,
        nickname: 'Wiadro123',
        email: 'andrew@demo.com',
        isLeader: false,
      },
      {
        id: 2,
        nickname: 'LeaderOnTop',
        email: 'powerbank@demo.com',
        isLeader: true,
      },
      {
        id: 3,
        nickname: 'TosterMiedzyswiata',
        email: 'toster@demo.com',
        isLeader: false,
      },
      {
        id: 4,
        nickname: 'Jablko',
        email: 'jablko@demo.com',
        isLeader: false,
      },
    ],
  }),
  beforeMount () {
    this.setLeaderAtTheTop();
  },
  methods: {
    setLeaderAtTheTop () {
      for (let i = 0; i < this.members.length; i++) {
        let temp;
        if (this.members[i].isLeader === true) {
          temp = this.members[0];
          this.members[0] = this.members[i];
          this.members[i] = temp;
        }
      }
    },
  },
};
</script>
