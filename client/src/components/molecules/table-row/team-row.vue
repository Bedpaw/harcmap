<template>
  <div class="m-grid f-team-view f-mb-1">
    <a-icon :type="ICONS_TYPES.outlined" :name=getUserIcon(user) />
    <div>{{user.nickname}}</div>
    <div>{{user.email}}</div>
  </div>
</template>

<script>
import { userUtils } from 'config/users-config';

export default {
  name: 'm-row-team-row',
  components: {
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getUserIcon (user) {
      return userUtils.getIcon(user);
    },
  },
};
</script>
