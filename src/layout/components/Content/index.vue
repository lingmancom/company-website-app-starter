<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const cacheList = []
    const key = computed(() => route.fullPath)

    return {
      cacheList,
      key,
    }
  },
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="key" />
    </keep-alive>
  </router-view>
</template>
