<template>
  <div
    ref="mapPopup"
    class="o-popup f-map"
  >
    <a-icon-close-popup
      add-class="f-map"
      size="20"
      @click="popup.hide()"
    />
    <div
      v-for="[key, singleData] of data.entries()"
      :key="'popup-map-data-' + key"
      class="m-list-element f-popup"
      @click="copyToClipboard(key)"
    >
      <a-icon
        class="a-icon f-list"
        :name="singleData.icon"
        size="20"
      />
      <div
        :ref="setItemRef"
        class="f-flex-1 f-pl-1 f-py-1"
      >
        {{ singleData.value }}
      </div>
    </div>
    <div
      v-for="[key, button] of modifyPointButtons.entries()"
      :key="'popup-map-button-' + key"
      class="m-list-element f-popup"
      @click="button.method(data.entries())"
    >
      <a-icon
        class="a-icon f-list"
        :name="button.icon"
        size="20"
      />
      <div class="f-flex-1 f-pl-1  f-py-1">
        {{ button.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { Popup } from 'map/popup';
import { mapGetters } from 'vuex';
import { actionUtils } from 'utils/action';
import AIconClosePopup from 'atoms/icon/close-popup';
import { translator } from 'src/dictionary';
import { communicates } from 'utils/communicates';
import { userUtils } from 'config/users-config';

export default {
  name: 'o-popup-map',
  components: {
    AIconClosePopup,
  },
  data: () => ({
    popup: null,
    itemRefs: [],
  }),
  computed: {
    ...mapGetters('mapPopup', ['data']),
    getEditPointButton () {
      return {
        icon: this.$icons.names.edit,
        label: this.$t('general.edit'),
        method: () => {
          this.$router.push({
            name: this.ROUTES.editPoint.name,
            params: { pointId: this.$store.getters['mapPopup/pointId'] },
          });
        },
      };
    },
    getDeletePointButton () {
      return {
        icon: this.$icons.names.delete,
        label: this.$t('general.remove'),
        method: () => {
          if (confirm(translator.t('communicate.map.confirmPointRemove'))) {
            communicates.showSuccess(translator.t('communicate.map.pointRemovingInProgress'));
            this.popup.hide();
            this.$store.dispatch('event/removePoint', this.$store.getters['mapPopup/pointId'])
              .then(() => communicates.showSuccessTemporary(translator.t('communicate.map.pointRemoved')))
              .catch(em => em.showMessage());
          }
        },
      };
    },
    modifyPointButtons () {
      return userUtils.can.editOrDeletePoints() ? [this.getEditPointButton, this.getDeletePointButton] : [];
    },
  },
  beforeUnmount () {
    this.popup.destroy();
  },
  beforeUpdate () {
    this.itemRefs = [];
  },
  methods: {
    setItemRef (el) {
      if (el) {
        this.itemRefs.push(el);
      }
    },
    definePopup () {
      this.popup = new Popup({
        container: this.$refs.mapPopup,
      });
    },
    copyToClipboard (key) {
      const element = this.itemRefs[key];
      actionUtils.copyToClipboard(element);
      communicates.showSuccessTemporary(this.$t('general.copied'));
      this.popup.hide();
    },
  },
};
</script>
