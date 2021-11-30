<template>
  <div class="m-clock">
    <a-icon
      size="32"
      :name="$icons.names.schedule"
      class="f-clock"
    />
    <div class="f-mb-2 f-text-center f-text-32 f-text-bold">
      {{ hours }}<span :class="separatorClass">{{ separator }}</span>{{ minutes }}
    </div>
  </div>
</template>

<script>
import { getTimeComponents } from 'utils/date';
export default {
  name: 'm-clock',
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
    separator: ':',
    separatorClass: '',
    blinkTime: 500,
  }),
  watch: {
    seconds () {
      this.separatorClass = 'f-hidden';
      setTimeout(() => {
        this.separatorClass = '';
      }, this.blinkTime);
    },
  },
  mounted () {
    this.updateDateTime();
    this.$options.interval = setInterval(this.updateDateTime, 1000);
  },
  beforeUnmount () {
    clearInterval(this.$options.interval);
  },
  methods: {
    updateDateTime () {
      const [seconds, minutes, hours] = getTimeComponents();
      this.seconds = seconds;
      this.minutes = minutes;
      this.hours = hours;
    },
  },
};
</script>
