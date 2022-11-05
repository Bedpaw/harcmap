<!-- TODO FIX IT -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <o-popup-empty ref="popup">
    <article class="f-text-16 f-text-normal f-p-2">
      <h3
        v-if="pointData.pointName"
        class="f-pb-3 f-m-0 f-text-bold f-text-22"
      >
        {{ pointData.pointName }}
      </h3>

      <template v-if="pointCategoryDescription">
        <div class="f-pb-2 f-text-bold f-text-16">
          {{ $t('form.field.categoryDescription') }}:
        </div>
        <div class="f-pb-2 f-text-14 f-text-justify">
          {{ pointCategoryDescription }}
        </div>
      </template>

      <template v-if="pointData.pointDescription">
        <div class="f-pb-2 f-text-bold f-text-16">
          {{ $t('form.field.pointDescription') }}:
        </div>
        <div
          class="f-pb-2 f-text-14 f-text-justify"
          v-html="stringUtils.linkify(pointData.pointDescription)"
        />
      </template>

      <template v-if="shouldSeenSuccessMessage">
        <div class="f-pb-2 f-text-bold">
          {{ $t('form.field.pointSuccessMessage') }}:
        </div>
        <div
          class="f-pb-2 f-text-14 f-text-justify"
          v-html="stringUtils.linkify(pointData.pointSuccessMessage)"
        />
      </template>
    </article>
  </o-popup-empty>
</template>

<script>
import OPopupEmpty from 'organisms/popup/empty';
import { userUtils } from 'config/users-config';
import { pointUtils } from 'utils/point';
import { mapGetters } from 'vuex';
import { stringUtils } from '../../../utils/string';

export default {
  name: 'o-popup-point-details',
  components: { OPopupEmpty },
  props: {},
  data: () => ({
    userUtils,
    pointUtils,
    stringUtils,
  }),
  computed: {
    ...mapGetters('event', [
      'getPointById', 'getCategoryById',
    ]),
    ...mapGetters('team', [
      'collectedPointsIds',
    ]),
    ...mapGetters('mapPopup', [
      'pointId',
    ]),
    pointData () {
      return this.getPointById(this.pointId);
    },
    pointCategoryDescription () {
      return this.getCategoryById(this.pointData.pointCategoryId).categoryDescription;
    },
    shouldSeenSuccessMessage () {
      if (['', null].includes(this.pointData.pointSuccessMessage))
        return false;

      if (userUtils.can.seePointsSuccessMessageDescription())
        return true;

      return pointUtils.isPointIdOnList(this.collectedPointsIds, { pointId: this.pointId });
    },
  },
  methods: {
    toggle () {
      this.$refs.popup.toggle();
    },
  },
};
</script>
