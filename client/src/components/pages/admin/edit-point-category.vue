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
  computed: {
    ...mapGetters('event', [
      'eventId',
    ]),
    defaultValues () {
      const pointCategoryId = this.$route.params.pointCategoryId;
      return Object.assign({}, this.$store.getters['event/getCategoryById'](pointCategoryId));
    },
  },
  methods: {
    editPointCategory (pointCategoryId) {
      console.log(pointCategoryId);
      // TODO api
    },
  },
};
</script>
