<template>
  <o-popup-empty
    ref="popup"
    add-class="f-info"
  >
    <div class="a-text f-title f-popup">
      {{ $t('communicate.loading.serverError') }}
    </div>
    <div class="a-text f-popup">
      <div>
        {{ $t('communicate.loading.checkConnection') }}
      </div>
      <div class="f-mt-1">
        <a
          class="a-link"
          @click="reloadPage()"
        >
          {{ $t('communicate.loading.tryAgain') }}
        </a>
      </div>
      <div class="f-mt-1">
        {{ $t('communicate.loading.reportProblem') }}
        <a
          class="a-link"
          :href="'mailto: ' + reportEmail"
        >{{ reportEmail }}</a>.
      </div>
    </div>
  </o-popup-empty>
</template>

<script>
import OPopupEmpty from 'organisms/popup/empty';
import { REPORT_EMAIL } from 'config/app-env';
import { ref } from 'vue';

export default {
  name: 'o-popup-connection-error',
  components: { OPopupEmpty },
  setup (props, { expose }) {
    const popup = ref();

    const reloadPage = () => window.location.reload();
    const showPopup = () => popup.value && popup.value.show();

    expose({ show: showPopup });

    return {
      reportEmail: REPORT_EMAIL,
      reloadPage,
      popup,
    };
  },
};
</script>
