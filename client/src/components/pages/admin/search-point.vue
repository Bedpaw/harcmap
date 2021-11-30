<template>
  <t-search
    :search-assist="$t('form.assist.searchPoint')"
    :elements="points"
    :search-keys="['pointId', 'pointName']"
  >
    <template #result-list="{ filteredElements: filteredPoints }">
      <div class="f-flex-1 f-scroll-default f-mr--2">
        <div
          v-for="point of filteredPoints"
          :key="point.pointId"
          class="m-grid f-search-point f-mr-2"
        >
          <a-button-icon class="f-minimal">
            <a-icon-category :category-id="point.pointCategory" />
          </a-button-icon>
          <div class="f-py-2 f-overflow-hidden">
            {{ point.pointId }}
          </div>
          <div class="f-pl-1 f-py-2 f-overflow-hidden f-text-subtext f-text-14">
            {{ point.pointName }}
          </div>
          <a-button-icon @click="panToMap(point)">
            <a-icon :name="$icons.names.map" />
          </a-button-icon>
        </div>
      </div>
    </template>
  </t-search>
</template>

<script>
import { mapGetters } from 'vuex';
import TSearch from 'templates/search';
import { map } from 'map';
import AButtonIcon from 'atoms/button/icon';
import AIconCategory from 'atoms/icon/category';

export default {
  name: 'p-search-point',
  components: {
    TSearch,
    AIconCategory,
    AButtonIcon,
  },
  computed: {
    ...mapGetters('event', ['points']),
  },
  methods: {
    panToMap (point) {
      map.panToPointLocationOnMap(point);
    },
  },
};
</script>
