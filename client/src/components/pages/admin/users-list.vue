<template>
  <t-search
    :search-assist="$t('form.assist.searchUser')"
    :elements="users"
    :searchKeys="['user', 'userTeam']"
  >
    <template v-slot:result-list="{ filteredElements: filteredUsers }">
      <div class="f-flex-1 f-scroll-default f-mt--2" >
        <div
          class="m-grid f-search-user f-mr-2"
          v-for="user of filteredUsers"
          :key="user.user"
        >
          <div class="f-py-1 f-line-24">
            {{ getUserIcon(user) }}
          </div>
          <div class="f-py-1 f-line-24">{{ user.userTeam }}</div>
          <div class="f-pl-1 f-py-1 f-text-subtext f-text-14 f-line-24">{{ user.user }}</div>
          <a-button-icon @click="openDetails(user)">
            <a-icon :name="ICONS.more_vert"/>
          </a-button-icon>
        </div>
        <o-popup-user-details ref="popup" v-if="user" :user="user"/>
      </div>
    </template>
  </t-search>
</template>

<script>
import { mapGetters } from 'vuex';
import TSearch from 'templates/search';
import AButtonIcon from 'atoms/button/icon';
import OPopupUserDetails from 'organisms/popup/user-details';
import { USERS_DEFAULT_CONFIG, userUtils } from 'config/users-config';

export default {
  name: 'p-users-list',
  components: {
    OPopupUserDetails,
    TSearch,
    AButtonIcon,
  },
  data: () => ({
    user: null,
  }),
  computed: {
    ...mapGetters('allUsers', ['users']),
  },
  mounted () {
    this.$store.dispatch('allUsers/download')
      .then(() => {
        this.errorMessage = '';
      })
      .catch(e => {
        this.errorMessage = e.message;
      });
  },
  methods: {
    openDetails (user) {
      this.user = user;
      this.$nextTick(() => { this.$refs.popup.toggle(); });
    },
    getUserIcon (user) {
      return userUtils.getIcon(user);
    },
  },
};
</script>
