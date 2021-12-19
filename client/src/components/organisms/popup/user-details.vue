<template>
  <o-popup-empty ref="popup">
    <article class="f-flex f-flex-col f-flex-al-start f-text-16 f-text-normal">
      <div class="f-pb-2 f-text-bold f-text-18">
        {{ user.email }}
      </div>
      <div class="f-pb-2 f-text-16">
        {{ user.role }}
      </div>
      <a-checkbox
        :id="'isActive-' + user.email"
        v-model="accountIsActive"
        class="f-pb-1"
        :is-disabled="isOrganizer"
      >
        {{ $t('page.admin.userList.accountIsActive') }}
      </a-checkbox>

      <span class="f-text-bold f-text-18 f-py-1">{{ $t('accountTypes.accountType') }}:</span>

      <a-radio
        v-for="(accountInfo, key) in USERS_DEFAULT_CONFIG.accountTypeInfo"
        :id="key"
        :key="key"
        v-model="role"
        class="f-pb-1"
        :value="key"
        :is-disabled="key === USERS_DEFAULT_CONFIG.accountTypes.organizer"
      >
        {{ $t(accountInfo.nameKey) }}
      </a-radio>

      <a-button-secondary
        add-area-class="f-100 f-mb-0"
        add-class="f-100"
        :disabled="isOrganizer"
        @click="sendResetPasswordCode"
      >
        {{ $t('form.button.sendResetPasswordToEmail') }}
      </a-button-secondary>

      <a-button-secondary
        add-area-class="f-mt-0"
        :disabled="isOrganizer"
        @click="blockUser"
      >
        {{ $t('form.button.blockAccount') }}
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
    role: null,
    accountIsActive: false,
  }),
  computed: {
    isOrganizer () {
      return userUtils.isOrganizer(this.user);
    },
  },
  mounted () {
    this.accountIsActive = this.user.accountIsActive;
    this.role = this.user.role;
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
