<template>
  <div
    class="circle"
    :style="circleStyle"
  />
</template>

<script>
export default {
  name: 'a-draw-point',
  props: {
    circleStyle: {
      type: Object,
      required: false,
      default: () => ({
        backgroundColor: 'green',
        borderColor: 'black',
        width: '40px',
        height: '40px',
      }),
    },
  },
};
</script>
<style>
.circle {
  border:2px solid;
  margin: auto;
  border-radius:50%;
  -moz-border-radius:50%;
  -webkit-border-radius:50%;
}
</style>
