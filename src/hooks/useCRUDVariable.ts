interface RequestPageSettings {
  /**
   * 每页请求数据
   * @default 20
   * @type number
   * @example
   * page_size: 20
   */
  page_size?: number

  /**
   * 页码
   * @default 1
   * @type number
   * @example
   * page_number: 1
   */
  page_number?: number

  /**
   * 总条数
   * @default 0
   * @type number
   * @example
   * total_count: 0
   */
  total_count?: number
}

export interface CRUDOptions<T extends object> {
  /**
   * 表格item
   * @type Record<string, any>
   * @example
   * item: {
   *   id: '',
   *   name: '',
   * }
   * @default {}
   */
  item?: T

  /**
   * 请求分页设置
   * @type RequestPageSettings
   * @example
   * requestPageSettings: {
   *   page_size: 20,
   *   page_number: 1,
   *   total_count: 0,
   * }
   * @default {}
   */
  requestPageSettings?: RequestPageSettings | Record<string, any>

  /**
   * 获取数据函数参数 可以传响应式的值
   */
  getParams?: Record<string, any>

  /**
   * 获取数据函数
   */
  getApiFn: (param: Record<string, any>) => Promise<any>

  /**
   * 新增和保存数据函数参数 可以传响应式的值
   */
  saveParams?: Record<string, any>

  /**
   * 新增和保存数据函数
   */
  saveApiFn?: (item: Record<string, any>) => Promise<any>

  /**
   * 删除数据函数参数 可以传响应式的值
   */
  deleteParams?: Record<string, any>

  /**
   * 删除数据函数
   */
  deleteApiFn?: (data: Record<string, any>) => Promise<any>

  /**
   * 获取数据详情函数参数 可以传响应式的值
   */
  detailParams?: Record<string, any>

  /**
   * 获取数据详情函数
   */
  detailApiFn?: (data: Record<string, any>) => Promise<any>

  /**
   * 获取数据前的钩子函数
   * @param data 请求参数
   * @returns 返回false则不请求
   */
  preGet?: (data: Record<string, any>) => Promise<boolean | Record<string, any>>

  /**
   * 获取数据后的钩子函数
   * @param data 请求结果
   */
  postGet?: (data: any, params: any) => Promise<any>

  /**
   * 保存数据前的钩子函数
   * @param data 请求参数
   * @returns 返回false则不请求
   */
  preSave?: (data: Record<string, any>) => Promise<boolean | Record<string, any>>

  /**
   * 保存数据后的钩子函数
   * @param data 请求结果
   */
  postSave?: (data: any, params: any) => Promise<any>

  /**
   * 删除数据前的钩子函数
   * @param data 请求参数
   * @returns 返回false则不请求
   */
  preDelete?: (data: Record<string, any>) => Promise<boolean | Record<string, any>>

  /**
   * 删除数据后的钩子函数
   * @param data 请求结果
   */
  postDelete?: (data: any, params: any) => Promise<any>

  /**
   * 获取数据详情前的钩子函数
   * @param data 请求参数
   * @returns 返回false则不请求
   */
  preDetail?: (data: Record<string, any>) => Promise<boolean | Record<string, any>>

  /**
   * 获取数据详情后的钩子函数
   * @param data 请求结果
   */
  postDetail?: (data: any, params: any) => Promise<any>

  /**
   * 是否在保存数据后重新加载数据
   * @default true
   */
  loadDataOnSave?: boolean

  /**
   * 是否在删除数据后重新加载数据
   * @default true
   */
  loadDataOnDelete?: boolean

  /**
   * 是否在保存数据后清空item
   * @default true
   */
  clearItemOnSave?: boolean

  /**
   * 删除提示文本
   * @default '此操作将永久删除, 是否继续?'
   */
  deleteConfirmText?: string
}

export function useCRUDVariable<T extends object>(options: CRUDOptions<T>) {
  /**
   * 加载状态
   * @default false
   * @type boolean
   */
  const loading = ref(false)

  /**
   * 表格数据
   */
  const tableData = ref([] as any[])
  /**
   * 表格节点
   */
  const multipleTable = ref(null as any)
  /**
   * 选中的数据
   * @param val 选中的数据
   */
  const multipleSelection = ref([] as any[])
  /**
   * 弹窗是否显示
   */
  const dialogVisible = ref<boolean>(false)

  /**
   * 表格选择处理函数
   */
  function handleSelectionChange(val: any) {
    multipleSelection.value = val
  }

  /**
   * 表格数据item
   */
  const item = reactive(generateItem() as T)

  /**
   * 生成item
   */
  function generateItem() {
    return {
      ...(options.item! || {}),
    }
  }

  /**
   * 请求分页设置
   */
  const requestPageSettings = reactive({
    page_size: 20, // 每页请求数据
    page_number: 1, // 页码
    total_count: 0, // 总条数
    q: '',
    ...options.requestPageSettings,
  })

  function handleCurrentChange(val: number) {
    requestPageSettings.page_number = val
    loadData()
  }

  async function loadData(params?: Record<string, any>) {
    loading.value = true
    let reqParams = { ...requestPageSettings, ...params, ...reactive({ ...options.getParams }), ...params }
    if (options.preGet) {
      const result = await options.preGet(reqParams)
      if (result === false)
        return
      reqParams = result as any
    }

    let res = await options.getApiFn(reqParams)
    res = await options.postGet?.(res, reqParams) || res
    if (Array.isArray(res)) {
      tableData.value = res
    }
    else {
      tableData.value = res.data
      requestPageSettings.total_count = res.total_count
    }
    loading.value = false
  }

  async function save(params?: Record<string, any>) {
    let reqParams = { ...item, ...reactive({ ...options.saveParams }), ...params }
    if (options.preSave) {
      const result = await options.preSave(reqParams)
      if (result === false)
        return
      reqParams = result as any
    }

    const res = await options.saveApiFn?.(reqParams)
    dialogVisible.value = false
    options.loadDataOnSave !== false && loadData()
    options.clearItemOnSave !== false && Object.assign(item, generateItem())
    ElMessage.success('保存成功')
    options.postSave?.(res, reqParams)
  }

  async function deleteData(params?: Record<string, any>) {
    if (multipleSelection.value.length === 0)
      return ElMessage.warning('请选择要删除的数据')
    const ids = multipleSelection.value.map(item => item.id)
    let reqParams = { id: ids, ids, ...reactive({ ...options.deleteParams }), ...params }
    if (options.preDelete) {
      const result = await options.preDelete(reqParams)
      if (result === false)
        return
      reqParams = result as any
    }

    ElMessageBox.confirm(options.deleteConfirmText ?? '此操作将永久删除, 是否继续?', '提示', { type: 'warning' }).then(async () => {
      const res = await options.deleteApiFn?.(reqParams)
      options.loadDataOnDelete !== false && loadData()
      ElMessage.success('删除成功')
      options.postDelete?.(res, reqParams)
    }).catch(() => { })
  }

  async function loadDetail(params?: Record<string, any>) {
    // eslint-disable-next-line dot-notation
    let reqParams = { id: item['id'], ...reactive({ ...options.detailParams }), ...params }
    if (options.preDetail) {
      const result = await options.preDetail(reqParams)
      if (result === false)
        return
      reqParams = result as any
    }
    const res = await options.detailApiFn?.(reqParams)
    Object.assign(item, res)
    options.postDetail?.(res, reqParams)
  }

  return {
    loading,
    tableData,
    item,
    requestPageSettings,
    multipleSelection,
    multipleTable,
    dialogVisible,
    loadData,
    save,
    loadDetail,
    deleteData,
    generateItem,
    handleSelectionChange,
    handleCurrentChange,
  }
}
