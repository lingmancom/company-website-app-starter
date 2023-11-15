<script setup lang="ts">
defineProps(['name'])
</script>

<template>
  <el-icon>
    <component :is="name" />
  </el-icon>
</template>

<style lang='scss' scoped>
</style>
