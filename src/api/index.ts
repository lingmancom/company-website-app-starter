export const Api = {
  // 测试接口Get
  testGet: () => Get('/api/account/get'),

  // 测试接口Post

  tesPost: data => Post('/api/account/post', data),

  // 登录接口
  login: data => service({ url: '/api/account/login', method: 'post', data }),
  // login: (data) => Post('/api/account/login', data),

  // 获取登录用户信息
  getUserInfo: () => Get<UserInfo>('/api/account/info'),

  // 获取项目列表
  GetProjects: () => Get<Project[]>('/api/app/apilog/projects'),

  // 改变APIroot
  ChangeApiUrl: data => Post('/api/app/apilog/ChangeUrl1', data),

  // 获取接口日志
  GetApiLoginfo: data => Post<ApiLog[]>('/api/app/apilog/nextpage', data),

  // 获取用户列表
  getUserList: () => Get('/api/account/get_all_info'),

  // 验证用户
  verifyUser: data => Post('/api/account/verify', data),

  // 保存用户
  saveUser: data => Post('/api/account/edit', data),

  // 删除用户
  deleteUser: data => Post('/api/account/delete', data),

  // 保存用户
  saveUserName: data => Post('/api/account/edit_name', data),

  // 保存用户
  saveUserRole: data => Post('/api/account/edit_role', data),

  // /api/project/project/save
  saveProjectUser: data => Post('/api/project/project/save', data),

  // /api/project/user/projects
  getUserProjectList: data => Get('/api/project/user/projects', data),

  // /api/proc/list
  getProcList: data => Get('/api/proc/list', data),

  // /api/proc/save
  saveProc: data => Post('/api/proc/save', data),

  // /api/proc/delete
  deleteProc: data => Post('/api/proc/delete', data),

  // /api/proc/role/save
  saveProcRole: data => Post('/api/proc/role/save', data),

  // /api/proc/role/list
  getProcRoleList: data => Get('/api/proc/role/list', data),

  // /api/stage/list
  getStageList: data => Get('/api/stage/list', data),

  // /api/stage/save
  saveStage: data => Post('/api/stage/save', data),

  // /api/stage/delete
  deleteStage: data => Post('/api/stage/delete', data),

  // /api/stage/sort
  sortStage: data => Post('/api/stage/sort', data),

  // /api/procins/list
  getProcInsList: data => Get('/api/procins/list', data),

  // /api/procins/save
  saveProcIns: data => Post('/api/procins/save', data),

  // /api/procins/delete
  deleteProcIns: data => Post('/api/procins/delete', data),

  // /api/procins/detail
  getProcInsDetail: data => Get('/api/procins/detail', data),

  // /api/contents/list
  getContentsList: data => Get('/api/contents/list', data),

  // /api/contents/save
  saveContents: data => Post('/api/contents/save', data),

  // /api/contents/delete
  deleteContents: data => Post('/api/contents/delete', data),

  // /api/category/list
  getCategoryList: data => Get('/api/category/list', data),

  // /api/category/save
  saveCategory: data => Post('/api/category/save', data),

  // /api/category/delete
  deleteCategory: data => Post('/api/category/delete', data),
}
