<template>
  <h2 class="f-text-24">
    Ustawienia mapy
  </h2>
  <a-checkbox
    v-model="featuresConfig.lineVisibility"
  >
    Pokaż trasę wzdłuż zebranych punków
  </a-checkbox>

  <h3 class="f-text-18">
    Filtry
  </h3>
  <m-input
    v-model="min"
    placeholder="Minimalna wartość punktu"
  >
    Minimalna wartość punktu
  </m-input>
  <m-input
    v-model="max"
    placeholder="Maksymalna wartość punktu"
  />

  <h3 class="f-text-18">
    Wygląd
  </h3>
  <m-input
    v-model="featuresConfig.pointRadius"
    placeholder="Wielkość punktów na mapie"
  />
  <m-input
    v-if="featuresConfig.lineVisibility"
    v-model="featuresConfig.lineWidth"
    placeholder="Szerokość trasy"
  />

  <a-button-primary @click="applyChanges">
    Zapisz zmiany
  </a-button-primary>
</template>

<script>
import { mapConfig } from 'map/config';
import { map } from 'map';
import ACheckbox from 'atoms/checkbox';
import AButtonPrimary from 'atoms/button/primary';
import MInput from 'molecules/input';
export default {
  name: 'o-map-settings',
  components: {
    MInput,
    AButtonPrimary,
    ACheckbox,
  },
  data: () => ({
    map: map,
    featuresConfig: {
      pointRadius: mapConfig.points.shapes.point.radius,
      lineVisibility: mapConfig.lineConnectingPoints.visible,
      lineWidth: mapConfig.lineConnectingPoints.width,
    },
    min: 0,
    max: 0,
  }),
  computed: {
    maxPointValue () {
      return Math.max(...this.$store.getters['event/categories'].map(c => c.pointValue));
    },
  },
  mounted () {
    this.max = this.maxPointValue;
  },
  methods: {
    applyChanges () {
      mapConfig.lineConnectingPoints.visible = this.featuresConfig.lineVisibility;
      mapConfig.points.shapes.point.radius = this.featuresConfig.pointRadius;
      mapConfig.lineConnectingPoints.width = this.featuresConfig.lineWidth;
      mapConfig.points.pointsVisibilityCondition = this.createPointValueFilter(this.min, this.max);
      map.refreshMap();
    },
    createPointValueFilter (minValue, maxValue) {
      return (point) => {
        const { pointValue } = this.$store.getters['event/getCategoryById'](point.pointCategoryId);

        return minValue <= pointValue && pointValue <= maxValue;
      };
    },
  },
};
</script>
