<template>
  <o-popup-empty ref="popup">
    <div class="f-text-subtext f-pb-1">{{ user.userTeam }}</div>
    <o-collected-points
      class="f-text-16 f-text-normal"
      :collected-points="collectedPointsByUser(user)"
    />
  </o-popup-empty>
</template>

<script>
import { mapGetters } from 'vuex';
import OCollectedPoints from 'organisms/collected-points';
import OPopupEmpty from 'organisms/popup/empty';

export default {
  name: 'o-popup-score',
  components: { OPopupEmpty, OCollectedPoints },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('allUsers', [
      'collectedPointsByUser',
    ]),
  },
  methods: {
    toggle () {
      this.$refs.popup.toggle();
    },
  },
};
</script>
