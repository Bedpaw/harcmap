<template>
  <div>
    <div class="m-grid f-score">
      <div class="f-text-left">
        {{ team.teamName }}
      </div>
      <div>{{ teamScore }} {{ $t('general.pointUnit') }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'm-row-score',
  components: {
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
