<template>
  <div>
    <div class="m-grid f-score">
      <div class="f-text-left">
        {{ team.teamName }}
      </div>
      <div>{{ teamScore }} {{ $t('general.pointUnit') }}</div>
      <div>
        <a-icon
          :name="$icons.names.more_vert"
          @click="toggleDetails"
        />
      </div>
    </div>
    <o-popup-score
      ref="popupScore"
      :team="team"
    />
  </div>
</template>

<script>
import OPopupScore from 'organisms/popup/score';

export default {
  name: 'm-row-score',
  components: {
    OPopupScore,
  },
  props: {
    team: {
      type: Object,
      required: true,
    },
    teamScore: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleDetails () {
      this.$refs.popupScore && this.$refs.popupScore.toggle();
    },
  },
};
</script>
