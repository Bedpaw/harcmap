<template>
  <t-page>
    <div class="a-text f-line-24 f-title f-menu f-text-center f-mb-2">{{ teamName }}</div>
    <div class="a-message f-text-22 f-text-center f-mb-2">Zdobylismy <b> {{ teamPoints }} </b> punktow</div>
    <div class="f-line-24">
      <div class="a-text f-title f-table f-mb-2">Czlonkowie druzyny</div>
      <div class="m-row f-header f-category-sum f-split-2">
        <div>Nickname</div>
        <div>Email</div>
      </div>
      <div class="m-grid f-split-2"
           v-for="item in members"
           :key="item.id"
      >
        <div>{{ item.nickname }}</div>
        <div>{{ item.email }}</div>
      </div>
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';

export default {
  name: 'p-team-view',
  components: {
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
      },
      {
        id: 2,
        nickname: 'Powerbank',
        email: 'powerbank@demo.com',
      },
    ],
  }),
};
</script>
