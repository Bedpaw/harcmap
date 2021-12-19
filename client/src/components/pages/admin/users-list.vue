<template>
  <t-search
    :search-assist="$t('form.assist.searchUser')"
    :elements="usersNotTeams"
    :search-keys="['user', 'userTeam']"
  >
    <template #result-list="{ filteredElements: filteredUsers }">
      <div class="f-flex-1 f-scroll-default f-mt--2">
        <div
          v-for="user of filteredUsers"
          :key="user.email"
          class="m-grid f-search-user"
        >
          <a-icon
            :type="$icons.types.outlined"
            :name="getUserIcon(user)"
          />
          <div class="f-pl-1 f-py-1 f-line-24 f-overflow-hidden">
            {{ user.role }}
          </div>
          <div class="f-pl-1 f-py-1 f-text-subtext f-text-14 f-line-24 f-overflow-hidden">
            {{ user.email }}
          </div>
          <a-button-icon @click="openDetails(user)">
            <a-icon :name="$icons.names.more_vert" />
          </a-button-icon>
        </div>
        <o-popup-user-details
          v-if="selectedUser"
          ref="popup"
          :user="selectedUser"
        />
      </div>
    </template>
  </t-search>
</template>

<script>
import { mapGetters } from 'vuex';
import TSearch from 'templates/search';
import AButtonIcon from 'atoms/button/icon';
import OPopupUserDetails from 'organisms/popup/user-details';
import { userUtils } from 'config/users-config';

export default {
  name: 'p-users-list',
  components: {
    OPopupUserDetails,
    TSearch,
    AButtonIcon,
  },
  data: () => ({
    selectedUser: null,
  }),
  computed: {
    ...mapGetters('allUsers', ['usersNotTeams']),
    ...mapGetters('event', ['eventId']),
  },
  mounted () {
    this.$store.dispatch('allUsers/download', this.eventId)
      .then(() => {
        this.errorMessage = '';
      })
      .catch(e => {
        this.errorMessage = e.message;
      });
  },
  methods: {
    openDetails (user) {
      this.selectedUser = user;
      this.$nextTick(() => this.$refs.popup.toggle());
    },
    getUserIcon (user) {
      return userUtils.getIcon(user);
    },
  },
};
</script>
