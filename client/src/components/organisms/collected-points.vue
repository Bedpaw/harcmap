<template>
  <div>
    <div class="f-line-24">
      <div class="a-text f-title f-table">
        {{ $t('page.collectedPoints.sumTitle') }}
      </div>
      <div class="m-row f-header f-category-sum">
        <div>{{ $t('table.category') }}</div>
        <div>{{ $t('table.numberOfCollected') }}</div>
        <div>{{ $t('table.sumOfValues') }}</div>
      </div>
      <m-row-category-sum
        v-for="category in categories"
        :key="category.categoryId"
        :category="category"
        :collected-points="collectedPoints"
      />
    </div>
    <div class="f-pt-3 f-line-24">
      <div class="a-text f-title f-table">
        {{ $t('page.collectedPoints.listTitle') }}
      </div>
      <div
        :class="checkIsObserver() ? 'f-admin' : 'f-common' "
        class="m-row f-header f-point"
      >
        <div>{{ $t('table.shortCategory') }}</div>
        <div v-if="checkIsObserver()">
          {{ $t('table.shortPointId') }}
        </div>
        <div>{{ $t('table.value') }}</div>
        <div>{{ $t('table.place') }}</div>
        <div>{{ $t('table.expand') }}</div>
      </div>
      <div
        v-if="collectedPoints.length === 0"
        class="a-message f-table"
      >
        {{ $t('page.collectedPoints.noPoints') }}
      </div>
      <m-row-point
        v-for="point of [...collectedPoints].reverse()"
        :key="point.pointId"
        :point="point"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MRowCategorySum from 'molecules/row/category-sum';
import MRowPoint from 'molecules/row/point';
export default {
  name: 'o-collected-points',
  components: {
    MRowPoint,
    MRowCategorySum,
  },
  props: {
    collectedPoints: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('event', [
      'categories',
    ]),
  },
};
</script>
