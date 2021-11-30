<template>
  <transition name="long-fade">
    <div class="o-loading" v-if="showLoading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="190.5mm"
        height="190.5mm"
        viewBox="0 0 190.5 190.5"
        :id="elementId"
        data-llp-composed="true"
        class="a-logo f-animated lazy-line-painter"
      >
        <g style="display:inline">
          <path
            v-for="[index, path] of paths.entries()"
            :key="index"
            style="fill: none; stroke-linecap: butt; stroke-linejoin: round; stroke-miterlimit: 4;"
            :d="path.d"
            :data-llp-id="elementId + '-' + index"
            :data-llp-duration="path.duration"
            :data-llp-delay="path.delay"
          />
        </g>
      </svg>
    </div>
  </transition>
</template>

<script>
import LazyLinePainter from 'lazy-line-painter';
import { mapGetters } from 'vuex';
import { promise } from '@dbetka/wdk/lib/promise';

export default {
  name: 'o-loading',
  data: () => ({
    elementId: 'harcmap-animated-logo',
    showLoading: true,
  }),
  mounted () {
    const svgElement = document.querySelector('#' + elementId);
    const animation = new LazyLinePainter(svgElement, {
      ease: 'easeInCubic',
      strokeWidth: 3.75,
      strokeOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeCap: 'butt',
    });

    animation.on('complete', () => {
      svgElement.classList.remove('f-after-hiding');
      svgElement.classList.add('f-hide');

      promise.timeout(1300)
        .then(() => { if (this.appIsLoading === false) throw new Error(); })
        .then(() => promise.timeout(500))
        .then(() => {
          animation.erase();
          svgElement.classList.add('f-after-hiding');
          svgElement.classList.remove('f-hide');
        })
        .then(() => promise.timeout(300))
        .then(() => animation.paint())
        .catch(() => (this.showLoading = false));
    });
    animation.paint();
  },
  computed: {
    ...mapGetters({
      appIsLoading: 'isLoading',
    }),
    paths () {
      const longDuration = 800;
      const shortDuration = 40;
      const averageDuration = 400;
      let delay = 0;
      const getDelayAndSum = (add = 0) => {
        const oldDelay = delay;
        delay += add;
        return oldDelay;
      };

      return [
        {
          d: 'm 73.659502,134.83801 c -1.168868,3.01119 -5.568296,5.36712 -10.301206,0.49477 -5.550996,19.1424 9.272908,23.24075 20.722931,18.69261 2.174084,8.30066 7.86087,12.57066 10.699854,15.23766 3.571861,-3.45325 7.643819,-6.37512 10.845899,-15.3524 14.98923,4.09713 25.88211,-2.51846 20.61778,-18.85873 -8.06987,7.59799 -15.08004,-2.46267 -6.26077,-10.34041 8.8259,-8.53945 19.30295,-9.65594 28.97461,-0.21402 C 177.94846,97.871855 150.16104,60.930082 118.51203,79.492469 121.04681,66.318995 120.29765,44.235763 94.678981,20.155752 71.876602,41.90952 67.871439,61.075919 70.978157,79.264319 65.330354,74.939006 49.652607,72.575696 42.840137,76.862104',
          duration: longDuration,
          delay: getDelayAndSum(longDuration),
        },
        {
          d: 'm 37.204165,80.411441 c -2.667744,2.098061 -4.744259,4.813339 -6.457632,7.857641',
          duration: shortDuration,
          delay: getDelayAndSum(shortDuration * 2),
        },
        {
          d: 'm 28.627146,94.676985 c -0.773654,2.320491 -0.425229,6.979965 0.01972,9.681605',
          duration: shortDuration,
          delay: getDelayAndSum(shortDuration * 2),
        },
        {
          d: 'm 29.700191,108.66148 c 0.629272,1.94776 1.482521,3.69029 2.549976,5.3353',
          duration: shortDuration,
          delay: getDelayAndSum(shortDuration * 2),
        },
        {
          d: 'm 35.985479,119.54106 c 1.563551,2.10846 2.465417,2.86207 4.441104,5.12522 1.605956,-1.1047 3.029251,-2.48237 4.857304,-3.22842',
          duration: shortDuration,
          delay: getDelayAndSum(shortDuration * 3),
        },
        {
          d: 'm 49.59736,119.50119 c 2.111449,-0.82947 4.110525,-1.32728 6.130694,-1.59435',
          duration: shortDuration,
          delay: getDelayAndSum(shortDuration * 4),
        },
        {
          d: 'm 62.328321,117.43115 c 2.292055,-0.018 4.644041,0.14634 7.251787,0.75613',
          duration: shortDuration,
          delay: getDelayAndSum(shortDuration * 5),
        },
        {
          d: 'M 75.122671,125.83719 91.541922,110.36286',
          duration: averageDuration,
          delay: getDelayAndSum(averageDuration),
        },
        {
          d: 'm 75.199056,110.4711 16.411387,15.41482',
          duration: averageDuration,
          delay: getDelayAndSum(averageDuration),
        },
      ];
    },
  },
};
</script>
