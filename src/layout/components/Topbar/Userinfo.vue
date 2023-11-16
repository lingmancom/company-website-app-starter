<script setup lang="ts">
import { toLogin } from '@/utils'

const accountStore = useAccountStore()
const appStore = useAppStore()
const router = useRouter()
const { userinfo } = storeToRefs(accountStore)

// 退出
function logout() {
  // 清除token
  appStore.clearToken()
  toLogin()
}
const whiteRoles = [1, 2]
</script>

<template>
  <el-dropdown trigger="click">
    <div class="userinfo">
      <template v-if="!userinfo">
        <i class="el-icon-user" />
        admin
      </template>
      <template v-else>
        <img class="avatar" :src="userinfo.avatar">
        {{ userinfo.name }}
      </template>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="whiteRoles.includes(userinfo?.role || 0)" @click="router.push({ name: 'user' })">
          用户列表
        </el-dropdown-item>
        <el-dropdown-item @click="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.userinfo {
  padding: 0 16px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #f5f5f5;
  }

  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }

  .avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
