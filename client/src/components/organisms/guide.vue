<template>
  <o-float-container>
    <a-icon-close-popup add-class="f-mt-1 f-mr-1" @click="close"/>
    <flicking
      ref="flicking"
      :options="{ align: 'prev', circular: false, defaultIndex: 0 }"
      @holdEnd="closeIfLast"
      :plugins="plugins"
    >

      <m-slide :key="0" :title="this.$t('features.guide.howItWorks.title')" :icon="$icons.names.help">
        {{ $t('features.guide.howItWorks.description') }}
        <span class="f-bold">{{ minutes($store.getters['event/mapRefreshTime']) }}</span>
        {{ $t('features.guide.howItWorks.add0') }}
        <div class="f-mt-1">{{ $t('features.guide.howItWorks.add1') }}</div>
      </m-slide>

      <m-slide :key="1" :title="this.$t('features.guide.eventStart.title')" :icon="$icons.names.timer">
        <div>{{ $t('features.guide.eventStart.description') }}</div>
        <div class="f-mt-1 f-bold">
          <span>{{ $t('features.guide.eventStart.add0') }}</span>
          <span>{{ datetime($store.getters['event/eventStartDate']) }}</span>
        </div>
        <div class="f-mt-1 f-bold">
          <span>{{ $t('features.guide.eventStart.add1') }}</span>
          <span>{{ datetime($store.getters['event/eventEndDate']) }}</span>
        </div>
      </m-slide>

      <m-slide :key="2" :title="this.$t('features.guide.permanentPoints.title')" :icon="$icons.names.add_circle">
        <div class="f-mb-3">{{ $t('features.guide.permanentPoints.description') }}</div>
        <div class="f-flex">
          <a-icon :name="$icons.names.stop_circle" class="f-text-info f-mr-1" size="20"/>
          <div class="f-line-24">{{ $t('features.guide.permanentPoints.add0') }} <span class="f-bold">1 {{ $t('general.pointUnit')}}</span></div>
        </div>
        <div class="f-flex">
          <a-icon :name="$icons.names.stop_circle" class="f-text-warning f-mr-1" size="20"/>
          <div class="f-line-24">{{ $t('features.guide.permanentPoints.add1') }} <span class="f-bold">2 {{ $t('general.pointUnit')}}</span></div>
        </div>
        <div class="f-flex">
          <a-icon :name="$icons.names.stop_circle" class="f-text-danger f-mr-1" size="20"/>
          <div class="f-line-24">{{ $t('features.guide.permanentPoints.add2') }} <span class="f-bold">3 {{ $t('general.pointUnit')}}</span></div>
        </div>
      </m-slide>

      <m-slide :key="3" :title="this.$t('features.guide.seeOnTimeoutPoints.title')" :icon="$icons.names.stars">
        <div class="f-mb-3">{{ $t('features.guide.seeOnTimeoutPoints.description') }}</div>
        <div class="f-flex">
          <a-icon :name="$icons.names.history_toggle_off" class="f-disabled-point f-mr-1" size="20"/>
          <div class="f-line-24">{{ $t('features.guide.seeOnTimeoutPoints.add0') }}</div>
        </div>
        <div class="f-flex">
          <a-icon :name="$icons.names.watch_later" class="f-active-point f-mr-1" size="20"/>
          <div class="f-line-24">{{ $t('features.guide.seeOnTimeoutPoints.add1') }}</div>
        </div>
        <div class="f-flex">
          <a-icon :name="$icons.names.access_time" class="f-future-point f-mr-1" size="20"/>
          <div class="f-line-24">{{ $t('features.guide.seeOnTimeoutPoints.add2') }}</div>
        </div>
      </m-slide>

      <m-slide :key="4" :title="this.$t('features.guide.startCollecting.title')" :icon="$icons.names.map">
        {{ $t('features.guide.startCollecting.description') }}
      </m-slide>

      <m-slide :key="5" :title="this.$t('features.guide.checkYourResults.title')" :icon="$icons.names.bar_chart">
        <div class="f-mb-1">{{ $t('features.guide.checkYourResults.description') }}</div>
        <ul>
          <li>{{ $t('features.guide.checkYourResults.add0') }}</li>
          <li>{{ $t('features.guide.checkYourResults.add1') }}</li>
          <li>{{ $t('features.guide.checkYourResults.add2') }}</li>
          <li>{{ $t('features.guide.checkYourResults.add3') }}</li>
          <li>{{ $t('features.guide.checkYourResults.add4') }}</li>
          <li>{{ $t('features.guide.checkYourResults.add5') }}</li>
        </ul>
      </m-slide>

      <m-slide :key="6" :title="this.$t('features.guide.covidInfo.title')" :icon="$icons.names.coronavirus">
        <div class="f-mb-1">{{ $t('features.guide.covidInfo.description') }}</div>
      </m-slide>

      <m-slide :key="7" title="" icon=""/>

      <template #viewport>
        <div class="flicking-pagination"></div>
      </template>

    </flicking>
  </o-float-container>
</template>

<script>
import OFloatContainer from 'organisms/float-container';
import MSlide from 'molecules/slide';
import AIconClosePopup from 'atoms/icon/close-popup';
import { mapGetters, mapMutations } from 'vuex';
import { DATE_FORMATS, displayDate } from 'utils/date';
import { Flicking, getPagination } from 'components/async/guide';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'o-guide',
  components: {
    AIconClosePopup,
    Flicking: defineAsyncComponent(Flicking),
    MSlide,
    OFloatContainer,
  },
  data: () => ({
    plugins: [],
  }),
  created () {
    this.setPlugins();
  },
  computed: {
    ...mapGetters('guide', ['isOpen']),
  },
  methods: {
    ...mapMutations('guide', ['close']),
    closeIfLast () {
      const flickingCamera = this.$refs.flicking.camera;
      const children = flickingCamera.children;
      const visiblePanels = flickingCamera.visiblePanels;
      const isLastChild = visiblePanels[visiblePanels.length - 1]._index === children.length - 1;

      isLastChild && this.close();
    },
    async setPlugins () {
      const { Pagination } = await getPagination();
      this.plugins = [new Pagination({ type: 'bullet' })];
    },
    minutes (time) {
      return displayDate.asDuration(time);
    },
    datetime (dateTime) {
      return displayDate.inFormat(dateTime, DATE_FORMATS.DDMMYYYYHHmm);
    },
  },
  watch: {
    isOpen () {
      this.$refs.flicking && this.$refs.flicking.init();
    },
  },
};
</script>
