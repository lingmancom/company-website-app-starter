export function useTableColumnFilter(key, customColumns) {
  const storeColumns = localGet(key)
  customColumns = customColumns.map(i => ({ ...i, show: true }))
  if (storeColumns) {
    customColumns = customColumns.map((i) => {
      const find = storeColumns.find(j => j.prop === i.prop)
      if (find)
        i.show = find.show
      return i
    }).sort((a, b) => {
      const aIndex = storeColumns.findIndex(i => i.prop === a.prop)
      const bIndex = storeColumns.findIndex(i => i.prop === b.prop)
      if (aIndex === -1)
        return 1
      return aIndex - bIndex
    })
  }

  const columns = ref(customColumns)

  watch(columns, (value) => {
    localSet(key, value.map(i => ({ prop: i.prop, show: i.show })))
  }, { deep: true, immediate: true })

  return {
    columns,
  }
}
