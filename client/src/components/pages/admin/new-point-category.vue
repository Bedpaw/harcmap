<template>
  <t-point-category-form
    :on-save="createNewPointCategory"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import TPointCategoryForm from 'templates/point-category-form';

export default {
  name: 'p-new-point-category',
  components: {
    TPointCategoryForm,
  },
  computed: {
    ...mapGetters('event', [
      'eventId',
    ]),
  },
  methods: {
    createNewPointCategory (pointCategory) {
      return this.$store.dispatch('event/addPointCategory', {
        pointCategory,
        eventId: this.eventId,
      });
    },
  },
};
</script>
