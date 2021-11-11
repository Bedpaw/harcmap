<template>
  <t-search
    :search-assist="$t('form.assist.searchUser')"
    :elements="users"
    :searchKeys="['user', 'userTeam']"
  >
    <template v-slot:result-list="{ filteredElements: filteredUsers }">
      <div class="f-flex-1 f-scroll-default f-mt--2" >
        <div
          class="m-grid f-search-user"
          v-for="user of filteredUsers"
          :key="user.user"
        >
          <a-icon :type="ICONS_TYPES.outlined" :name=getUserIcon(user) />
          <div class="f-pl-1 f-py-1 f-line-24 f-overflow-hidden">{{ user.userTeam }}</div>
          <div class="f-pl-1 f-py-1 f-text-subtext f-text-14 f-line-24 f-overflow-hidden">{{ user.user }}</div>
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
import { userUtils } from 'config/users-config';

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
      this.$nextTick(() => this.$refs.popup.toggle());
    },
    getUserIcon (user) {
      return userUtils.getIcon(user);
    },
  },
};
</script>
