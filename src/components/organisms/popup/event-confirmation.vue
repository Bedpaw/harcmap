<template>
  <o-popup-empty ref="popup">
    <article class="f-flex f-flex-col f-flex-al-start f-text-16 f-text-normal">
      <div class="f-pb-2 f-text-bold f-text-18" >{{$t('page.joinEvent.confirmData')}}</div>
      <div v-for="dataRow in dataRows" :key="dataRow.label">{{$t(dataRow.label)}}:
        <span class="f-text-bold f-line-24"> {{dataRow.data}}</span>
      </div>
      <a-button-primary add-area-class="f-mt-2 f-mb-0" @click="enterEvent">{{$t('form.button.next')}}</a-button-primary>
      <a-button-secondary add-area-class="f-mt-0 f-mb-1" @click="toggle">{{$t('form.button.cancel')}}</a-button-secondary>
    </article>
  </o-popup-empty>
</template>

<script>
import OPopupEmpty from 'organisms/popup/empty';
import AButtonPrimary from 'atoms/button/primary';
import AButtonSecondary from 'atoms/button/secondary';
import { userUtils } from 'src/config/users-config';
import { DATE_FORMATS, getDateInFormat } from 'utils/date';

export default {
  name: 'o-popup-event-confirmation',
  components: { OPopupEmpty, AButtonPrimary, AButtonSecondary },
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  computed: {
    dataRows: function () {
      const {
        eventName,
        eventId,
        eventStartDate,
        eventEndDate,
        accountType,
      } = this.event;
      return [
        {
          label: 'general.name',
          data: eventName,
        },
        {
          label: 'form.field.eventId',
          data: eventId,
        },
        {
          label: 'page.joinEvent.eventStartDate',
          data: getDateInFormat(eventStartDate, DATE_FORMATS.DDMMYYYYHHmm),
        },
        {
          label: 'page.joinEvent.eventEndDate',
          data: getDateInFormat(eventEndDate, DATE_FORMATS.DDMMYYYYHHmm),
        },
        {
          label: 'accountTypes.accountType',
          data: this.$t(userUtils.getNameKey({ accountType })),
        },
      ];
    },
  },
  methods: {
    toggle () {
      this.$refs.popup.toggle();
    },
    enterEvent () {
      console.log(`Enter event with id ${this.event.eventId}`);
    },
  },
};
</script>
