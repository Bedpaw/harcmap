<template>
  <div class="m-grid f-category-sum">
    <div>{{this.$props.nickname}}</div>
    <div>{{this.$props.email}}</div>
  </div>
</template>

<script>
export default {
  name: 'm-row-team-row',
  components: {
  },
  props: {
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
};
</script>
