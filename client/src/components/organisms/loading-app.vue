<template>
  <transition name="long-fade">
    <div
      v-if="state.showLoading"
      class="o-loading f-flex f-flex-col"
      @click="showPopup()"
    >
      <m-loading-app
        :test-mode="config.testMode"
        :app-is-loading="appIsLoading"
        :count-for-pending="config.loadingCountForPending"
        :count-for-error="config.loadingCountForError"
        @pending="onPending()"
        @complete="onComplete()"
        @pending-error="onPendingError()"
      />
      <div class="f-flex-1" />
      <div class="f-text-white f-text-14 f-bold">
        <transition name="longer-fade">
          <div
            v-if="state.pending"
            class="a-text-status-loading"
          >
            {{ $t('communicate.loading.waitingForConnection') }}
          </div>
        </transition>
        <transition name="longer-delay-fade">
          <div
            v-if="state.error"
            class="a-text-status-loading"
          >
            {{ $t('communicate.loading.serverError') }}
            <a-icon
              :name="$icons.names.info"
              size="18"
              class="f-text-danger"
            />
          </div>
        </transition>
      </div>
      <o-popup-connection-error ref="errorPopup" />
    </div>
  </transition>
</template>

<script>
import { useStore } from 'vuex';
import OPopupConnectionError from 'organisms/popup/connection-error';
import MLoadingApp from 'molecules/loading-app';
import { computed, onMounted, reactive, ref } from 'vue';
import { SplashScreen } from '@capacitor/splash-screen';

export default {
  name: 'o-loading-app',
  components: { MLoadingApp, OPopupConnectionError },
  setup () {
    const config = {
      testMode: false,
      loadingCountForPending: 1,
      loadingCountForError: 6,
      timeToShowErrorPopup: 6000,
    };
    const state = reactive({
      showLoading: true,
      pending: false,
      error: false,
      loadingCounter: 0,
      errorPopupViewed: false,
    });

    const errorPopup = ref();
    const appIsLoading = computed(() => useStore().getters.isLoading);

    function showPopup () {
      if (state.error && errorPopup) {
        state.errorPopupViewed = true;
        errorPopup.value.show();
      }
    }

    const onPending = () => (state.pending = true);
    const onComplete = () => (state.showLoading = false);
    const onPendingError = () => {
      state.pending = false;
      state.error = true;

      setTimeout(
        () => state.errorPopupViewed === false && showPopup(),
        config.timeToShowErrorPopup,
      );
    };

    onMounted(() => {
      SplashScreen.hide();
    });

    return {
      config,
      state,
      appIsLoading,
      showPopup,
      onPending,
      onComplete,
      onPendingError,
      errorPopup,
    };
  },
};
</script>
