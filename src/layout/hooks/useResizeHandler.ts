const WIDTH = 768
export function useResizeHandler() {
  const appStore = useAppStore()

  const isMobile = () => {
    return window.innerWidth < WIDTH
  }

  const resizeHandler = () => {
    if (isMobile()) {
      appStore.device = 'mobile'
      appStore.setCollapse(1)
    }
    else {
      appStore.device = 'desktop'
      appStore.setCollapse(0)
    }
  }

  onBeforeMount(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
