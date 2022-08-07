<template>
  <t-page class="f-text-center">
    <template v-if="adminDetails">
      <div class="a-text f-title f-table">
        {{ $t('page.scoreboard.completionLevelOfTheGame') }}
      </div>
      <div class="f-pt-1">
        <template v-for="[key, {categoryId, pointFillColor}] of categories.entries()">
          <m-circle-progress
            v-if="numberOfPermanentPointsByCategoryId(categoryId) > 0"
            :key="`circle-progress${key}`"
            class="f-mr-1"
            :class="{'f-ml-1': key === 0}"
            :number-of-completed="numberOfCollectedPointsByCategoryId(categoryId)"
            :progress="percentageProgressByCategoryId(categoryId)"
            :max-range="numberOfPermanentPointsByCategoryId(categoryId)"
            :color="pointFillColor"
          />
        </template>
      </div>
      <div class="f-pt-1 f-pb-3 f-text-subtext f-text-14">
        {{ $t('page.scoreboard.completionLevelDetails') }}
      </div>
    </template>

    <div class="f-line-24">
      <div class="a-text f-title f-table">
        {{ $t('page.scoreboard.scoreboard') }}
      </div>
      <div
        :class="adminDetails ? 'f-score' : 'f-score-trim'"
        class="m-row f-header f-score"
      >
        <div>{{ $t('table.team') }}</div>
        <div>{{ $t('table.score') }}</div>
        <div v-if="adminDetails">
          {{ $t('table.more') }}
        </div>
      </div>
      <div
        v-if="errorMessage"
        class="a-message f-table f-error"
        v-text="errorMessage"
      />
      <div
        v-else-if="teams.length === 0"
        class="a-message f-table"
        v-text="$t('page.collectedPoints.noPoints')"
      />
      <m-row-score
        v-for="[key, {team, teamScore}] of sortedTeams.entries()"
        :key="team.pointId"
        :admin-details="adminDetails"
        class="f-text-subtext"
        :class="{ 'f-text-standard': key < 3, 'f-bold': key <= 0 }"
        :team="team"
        :team-score="teamScore"
      />
    </div>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import { mapGetters } from 'vuex';
import MRowScore from 'molecules/row/score';
import MCircleProgress from 'molecules/circle-progress';
export default {
  name: 't-scoreboard',
  components: {
    MCircleProgress,
    MRowScore,
    TPage,
  },
  props: {
    adminDetails: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    errorMessage: '',
  }),
  computed: {
    ...mapGetters('groups', [
      'teams',
      'scoreByTeam',
    ]),
    ...mapGetters('event', [
      'categories',
      'numberOfCollectedPointsByCategoryId',
      'numberOfPermanentPointsByCategoryId',
      'percentageProgressByCategoryId',
      'eventId',
    ]),
    ...mapGetters('theme', [
      'categoryColorById',
    ]),
    sortedTeams () {
      return this.teams
        .map(team => ({
          team,
          teamScore: this.scoreByTeam(team),
        }))
        .sort((a, b) => b.teamScore - a.teamScore);
    },
  },
  mounted () {
    this.$store.dispatch('groups/downloadTeams', this.eventId)
      .then(() => {
        this.errorMessage = '';
      })
      .catch(e => {
        this.errorMessage = e.message;
      });
  },
};
</script>
