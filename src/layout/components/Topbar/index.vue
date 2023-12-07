<script setup lang="ts">
import Userinfo from './Userinfo.vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const isDev = import.meta.env.MODE === 'development'
</script>

<template>
  <div class="header">
    <div class="navigation" @click="$router.replace({ path: '/' })">
      <img src="/favicon.ico">
      <!-- <div>灵曼应用</div> -->
    </div>
    <div class="fc c-white fwbold text-20">
      应用名称
    </div>
    <div class="action">
      <Userinfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 48px;
  border-bottom: 1px solid #e0e4ef;
  display: flex;
  justify-content: space-between;
  background-color: $mainColor;

  &.no-border {
    border: none;
  }

  .navigation {
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 0 10px;
    color: #fff;
    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }

  .action {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.mobile {
  padding-right: 0;

  ::v-deep(.logo) {
    max-width: 24px;
    max-height: 24px;
  }

  ::v-deep(.title) {
    display: none;
  }
}

.show-title {
  ::v-deep(.title) {
    display: block;
    color: #333;
  }
}
</style>
