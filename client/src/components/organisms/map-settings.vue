<template>
  <h2 class="f-text-28 f-m-0 f-text-normal f-pt-2 f-pb-3">
    {{ $t('features.mapSettings.title') }}
  </h2>
  <a-checkbox v-model="featuresConfig.lineVisibility">
    {{ $t('features.mapSettings.features.lineVisibility') }}
  </a-checkbox>
  <a-checkbox v-model="featuresConfig.myPosition">
    {{ $t('features.mapSettings.features.myPosition') }}
  </a-checkbox>

  <template v-if="false">
    <!-- TODO for future    -->
    <ol>
      <li
        v-for="log in $store.state.mapLogs"
        :key="log"
      >
        {{ log }}
      </li>
    </ol>
    <a-button-primary @click="$store.commit('clearMapLogs')">
      Clear logs
    </a-button-primary>
  </template>

  <a-button-primary
    add-area-class="f-mt-4"
    @click="applyChanges"
  >
    {{ $t('form.button.save') }}
  </a-button-primary>
</template>

<script>
import { mapConfig } from 'map/config';
import { map } from 'map';
import ACheckbox from 'atoms/checkbox';
import AButtonPrimary from 'atoms/button/primary';
export default {
  name: 'o-map-settings',
  components: {
    AButtonPrimary,
    ACheckbox,
  },
  data: () => ({
    map: map,
    featuresConfig: {
      lineVisibility: mapConfig.lineConnectingPoints.visible,
      myPosition: mapConfig.myPosition.isVisible,
    },
  }),
  methods: {
    applyChanges () {
      mapConfig.lineConnectingPoints.visible = this.featuresConfig.lineVisibility;
      mapConfig.myPosition.isVisible = this.featuresConfig.myPosition;
      map.refreshMap();
    },
  },
};
</script>
