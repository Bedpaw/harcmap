<template>
  <t-page>
    <div class="f-pt-1 f-pb-4">
      {{ $t('page.collectPoint.content') }}
    </div>
    <o-form :on-submit="collectPoint">
      <m-field-text
        v-model="collectedPointId"
        :label="$t('form.field.pointId')"
        :rules="validationRules.pointId"
        :disabled="blockForm"
        :tests-selector="testSelectors.inputs.collectPoint"
      />
      <a-button-submit
        :disabled="blockForm"
        :is-sending="isSending"
        :tests-selector="testSelectors.buttons.collectPoint"
      />
    </o-form>
  </t-page>
</template>

<script>
import TPage from 'templates/page';
import { ROUTES } from 'config/routes-config';
import OForm from 'organisms/form';
import MFieldText from 'molecules/field/text';
import AButtonSubmit from 'atoms/button/submit';
import { translator } from 'src/dictionary';
import { useIcons } from '@dbetka/vue-material-icons';
import { ref } from 'vue';
import { useForm } from 'plugins/form';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { map } from 'map';
import { testSelectors } from 'data/selectors';
import { stringUtils } from 'utils/string';

export default {
  name: 'p-collect-point',
  components: {
    TPage,
    AButtonSubmit,
    MFieldText,
    OForm,
  },
  setup () {
    const collectedPointId = ref('');

    const form = useForm();
    const { isSending, blockForm, onErrorOccurs } = form;

    const store = useStore();
    const router = useRouter();
    const icons = useIcons();

    const getStandardSuccessMessageTemplate = () => ({
      messages: [
        translator.t('communicate.collectPoint.congratulation'),
        translator.t('communicate.collectPoint.youCollectedPoint'),
      ],
      icon: icons.names.check_circle_outline,
    });

    function onCollectPoint (point) {
      const messageDetails = getStandardSuccessMessageTemplate();

      if (point.pointSuccessMessage) {
        messageDetails.classes = 'f-success-message';
        messageDetails.messages.push(stringUtils.linkify(point.pointSuccessMessage));
        messageDetails.icon = null;
      }

      store.dispatch('popup/open', messageDetails)
        .then(() => {
          isSending.value = false;
          blockForm.value = false;
          map.updateMapFeatures();
          router.push(ROUTES.map.path);
        });
    }

    function collectPoint () {
      const pointKey = collectedPointId.value;
      store.dispatch('event/collectPoint', pointKey)
        .then(onCollectPoint)
        .catch(onErrorOccurs);
    }

    return {
      collectedPointId,
      collectPoint,
      ...form,
      testSelectors,
    };
  },
};
</script>
