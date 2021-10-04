<template>
  <o-popup-empty ref="popup">
    <article class="f-flex f-flex-col f-flex-al-start f-text-16 f-text-normal">
      <div class="f-pb-2 f-text-bold f-text-18" >{{user.userTeam}}</div>
      <div class="f-pb-2 f-text-16">{{user.user}}</div>
      <a-checkbox
        class="f-pb-1"
        :id="'isActive-' + user.user"
        v-model="accountIsActive"
        :is-disabled="isOrganizer"
      >
        {{$t('page.admin.userList.accountIsActive')}}
      </a-checkbox>

      <span class="f-text-bold f-text-18 f-py-1">{{$t('accountTypes.accountType')}}:</span>

      <a-radio
        class="f-pb-1"
        v-for="(accountInfo, key) in USERS_DEFAULT_CONFIG.accountTypeInfo"
        :key="key" :id="key" :value="key"
        v-model="accountType"
        :is-disabled="key === USERS_DEFAULT_CONFIG.accountTypes.organizer">
        {{$t(accountInfo.nameKey)}}
      </a-radio>

      <a-button-secondary
        add-area-class="f-100 f-mb-0" add-class="f-100"
        :disabled="isOrganizer"
        @click="sendResetPasswordCode">
        {{$t('form.button.sendResetPasswordToEmail')}}
      </a-button-secondary>

      <a-button-secondary
        add-area-class="f-mt-0"
        :disabled="isOrganizer"
        @click="blockUser">
        {{$t('form.button.blockAccount')}}
      </a-button-secondary>
    </article>
  </o-popup-empty>
</template>

<script>
import OPopupEmpty from 'organisms/popup/empty';
import AButtonSecondary from 'atoms/button/secondary';
import { USERS_DEFAULT_CONFIG, userUtils } from 'config/users-config';
import ARadio from 'atoms/radio';
import ACheckbox from 'atoms/checkbox';

export default {
  name: 'o-popup-user-details',
  components: { ACheckbox, ARadio, OPopupEmpty, AButtonSecondary },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    USERS_DEFAULT_CONFIG,
    accountType: null,
    accountIsActive: false,
  }),
  computed: {
    isOrganizer () {
      return userUtils.isOrganizer(this.user);
    },
  },
  mounted () {
    this.accountIsActive = this.user.accountIsActive;
    this.accountType = this.user.accountType;
  },
  methods: {
    toggle () {
      this.$refs.popup.toggle();
    },
    sendResetPasswordCode () {
      console.log('Send reset password code');
    },
    blockUser () {
      console.log('Block user');
    },
  },
};
</script>
