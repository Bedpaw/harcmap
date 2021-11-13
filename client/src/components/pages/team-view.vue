<template>
  <t-page>
    <div class="a-text f-line-24 f-title f-menu f-text-center f-mb-2">{{ teamName }}</div>
    <div class="a-message f-text-22 f-text-center f-mb-2">Zdobylismy <b> {{ teamPoints }} </b> punktow</div>
    <div class="f-line-24">
      <div class="a-text f-title f-table f-mb-2">Czlonkowie druzyny</div>
      <div class="m-row f-header f-category-sum f-flex-0">
        <div>Nickname</div>
        <div>Email</div>
      </div>
      <div class="m-grid f-category-sum f-flex-0 f-mr-2 f-overflow-hidden"
           v-for="item in members"
           :key="item.id"
      >
        <m-row-team-row :email="item.email" :nickname="item.nickname"></m-row-team-row>
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
    teamName: 'Team no1',
    teamPoints: 4200,
    members: [
      {
        id: 1,
        nickname: 'Wiadro',
        email: 'andrew@demo.com',
        isLeader: false,
      },
      {
        id: 2,
        nickname: 'Leader',
        email: 'powerbank@demo.com',
        isLeader: true,
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
