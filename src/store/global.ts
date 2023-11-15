export const useGlobalDataStore = defineStore('globalData', () => {
  const tagList = ref([] as any[])

  async function loadTags() {
    // const tags = await Api.getTagList({ page_size: 1000 })
    // tagList.value = tags.data
  }

  return {
    tagList,
    loadTags,
  }
})
