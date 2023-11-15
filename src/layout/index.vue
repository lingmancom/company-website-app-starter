<script lang="ts">
import { isMobileDevice } from 'lingman-web'
import Topbar from './components/Topbar/index.vue'
import ContentView from './components/Content/index.vue'
import { useResizeHandler } from './hooks/useResizeHandler'

export default defineComponent({
  name: 'Layout',
  components: {
    Topbar,
    ContentView,
  },

  setup() {
    useResizeHandler()
    const route = useRoute()
    return {
      isMobile: computed(() => route.meta.hidden && isMobileDevice()),
    }
  },
})
</script>

<template>
  <div class="wrapper flex">
    <div class="top">
      <Topbar v-if="!isMobile" />
    </div>
    <div class="main">
      <ContentView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  flex: 1;
  height: 100%;
  // overflow: scroll;
  -ms-scroll-chaining: touch;
  -webkit-overflow-scrolling: touch;

  &.flex {
    display: flex;
    flex-direction: column;
  }

  .top {
    background: #fff;
  }

  .main {
    flex: 1;
    overflow-y: scroll;
    background: #f5f5f5;

    &.pt0 {
      padding-top: 0;
    }

    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }

    &::-webkit-scrollbar-corner {
      background: #179a16;
    }
  }
}
</style>
