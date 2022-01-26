<template>
  <div
    v-for="c in categories"
    :key="c.categoryId"
    class="m-grid f-point-category-list"
    @click="pushToEditPoint(c.categoryId)"
  >
    <a-draw-point />
    <div>{{ c.categoryName }}</div>
    <div>{{ c.pointValue }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ADrawPoint from 'atoms/draw-point';

export default {
  name: 'p-point-category-list',
  components: {
    ADrawPoint,
  },
  computed: {
    ...mapGetters('event', [
      'categories',
    ]),
  },
  methods: {
    pushToEditPoint (categoryId) {
      this.$router.push({
        name: this.ROUTES.editPointCategory.name,
        params: { pointCategoryId: categoryId },
      });
    },
    createNewPointCategory (pointCategory) {
      return this.$store.dispatch('event/addPointCategory', {
        pointCategory,
        eventId: this.eventId,
      });
    },
  },
};
</script>
<style>
</style>
