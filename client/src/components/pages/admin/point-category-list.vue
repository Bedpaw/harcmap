<template>
  <t-page class="f-text-center f-p-0">
    <div class="m-grid f-point-category-list">
      <div class="m-row f-header">
        {{ $t('general.look') }}
      </div>
      <div class="m-row f-header">
        {{ $t('general.name') }}
      </div>
      <div class="m-row f-header">
        {{ $t('table.value') }}
      </div>
      <div class="m-row f-header">
        {{ $t('general.edit') }}
      </div>
      <div class="m-row f-header">
        {{ $t('general.remove') }}
      </div>
    </div>
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
      <div>{{ c.categoryName }}</div>
      <div>{{ c.pointValue }}</div>
      <a-icon
        :name="$icons.names.edit"
        @click="pushToEditPoint(c.categoryId)"
      />
      <a-icon
        :name="$icons.names.delete"
        @click="deleteCategory(c.categoryId)"
      />
    </div>
    <a-button-primary @click="$router.push(ROUTES.newPointCategory.path)">
      {{ $t('general.add') }}
    </a-button-primary>
  </t-page>
</template>

<script>
import { mapGetters } from 'vuex';
import ADrawPoint from 'atoms/draw-point';
import { translator } from 'dictionary';
import { communicates } from 'utils/communicates';
import AButtonPrimary from 'atoms/button/primary';
import TPage from 'templates/page';

export default {
  name: 'p-point-category-list',
  components: {
    AButtonPrimary,
    ADrawPoint,
    TPage,
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
