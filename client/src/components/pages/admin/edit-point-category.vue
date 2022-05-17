<template>
  <t-point-category-form
    :default-values="defaultValues"
    :on-save="editPointCategory"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import TPointCategoryForm from 'templates/point-category-form';

export default {
  name: 'p-edit-point-category',
  components: {
    TPointCategoryForm,
  },
  data: () => ({
    pointCategoryId: null,
  }),
  computed: {
    ...mapGetters('event', [
      'eventId',
    ]),
    defaultValues () {
      return Object.assign({}, this.$store.getters['event/getCategoryById'](this.pointCategoryId));
    },
  },
  created () {
    this.pointCategoryId = this.$route.params.pointCategoryId;
  },
  methods: {
    editPointCategory (pointCategory) {
      return this.$store.dispatch('event/editPointCategory', { pointCategory, pointCategoryId: this.pointCategoryId });
    },
  },
};
</script>
