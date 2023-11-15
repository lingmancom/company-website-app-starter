<script setup lang="ts">
const accountStore = useAccountStore()
const { userinfo } = storeToRefs(accountStore)
</script>

<template>
  <div class="userinfo">
    <template v-if="!userinfo">
      <i class="el-icon-user" />
      <h3>admin</h3>
    </template>
    <template v-else>
      <img class="avatar" :src="userinfo.avatar">
      <h3>{{ userinfo.nick_name }}</h3>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;

  i {
    font-size: 48px;
    color: $mainColor;
  }

  h3 {
    font-size: 14px;
    font-weight: normal;
    margin: 8px 0;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
}
</style>
