<template>
  <div
    v-for="c in categories"
    :key="c.categoryId"
    class="m-grid f-point-category-list"
  >
    <a-draw-point
      :circle-style="{
        backgroundColor: c.pointFillColor,
        borderColor: c.pointStrokeColor,
        width: '40px',
        height: '40px',
      }"
    />
    <div @click="pushToEditPoint(c.categoryId)">
      {{ c.categoryName }}
    </div>
    <div>{{ c.pointValue }}</div>
    <a-icon
      :name="$icons.names.delete"
      @click.prevent="deleteCategory(c.categoryId)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ADrawPoint from 'atoms/draw-point';
import { translator } from 'dictionary';
import { communicates } from 'utils/communicates';

export default {
  name: 'p-point-category-list',
  components: {
    ADrawPoint,
  },
  computed: {
    ...mapGetters('event', [
      'categories',
      'points',
    ]),
  },
  methods: {
    pushToEditPoint (categoryId) {
      this.$router.push({
        name: this.ROUTES.editPointCategory.name,
        params: { pointCategoryId: categoryId },
      });
    },
    createNewPointCategory (pointCategoryId) {
      return this.$store.dispatch('event/addPointCategory', {
        pointCategoryId,
        eventId: this.eventId,
      });
    },
    deleteCategory (pointCategoryId) {
      const numberOfPointsWithThisCategory = this.points.filter(point => point.pointCategoryId === pointCategoryId).length;
      if (numberOfPointsWithThisCategory > 0) {
        communicates.showErrorTemporary(this.$t('communicate.pointCategory.errorCategoryIsUsed') + `${numberOfPointsWithThisCategory}`);
        return;
      }
      if (this.categories.length < 2) {
        communicates.showErrorTemporary(this.$t('communicate.pointCategory.errorLastCategory'));
        return;
      }
      if (confirm(translator.t('communicate.pointCategory.confirmPointCategoryRemove'))) {
        communicates.showSuccess(translator.t('communicate.pointCategory.pointCategoryRemovingInProgress'));
        this.$store.dispatch('event/deletePointCategory', { pointCategoryId })
          .then(() => communicates.showSuccessTemporary(translator.t('communicate.pointCategory.pointCategoryRemoved')))
          .catch(em => em.showMessage());
      }
    },
  },
};
</script>
<style>
</style>
