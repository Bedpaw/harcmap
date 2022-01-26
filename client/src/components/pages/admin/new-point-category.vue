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
    createNewPointCategory (pointCategoryId) {
      return this.$store.dispatch('event/addPointCategory', {
        pointCategoryId,
        eventId: this.eventId,
      });
    },
  },
};
</script>
