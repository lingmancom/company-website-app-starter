<script setup lang="ts">
</script>

<template>
  <div class="top">
    <div>
      <slot name="left" />
    </div>
    <div>
      <slot name="center" />
    </div>
    <div>
      <slot name="right" />
    </div>
    <slot />
  </div>
</template>

<style lang='scss' scoped>
.top {
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
</style>
