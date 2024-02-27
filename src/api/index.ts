export const Api = {
  // 测试接口Get
  testGet: () => Get('/api/account/get'),

  // 测试接口Post
  tesPost: data => Post('/api/account/post', data),

  // 登录接口
  login: data => service({ url: '/api/account/login', method: 'post', data }),
  // login: (data) => Post('/api/account/login', data),

  // 获取登录用户信息
  getUserInfo: () => Get('/api/account/info'),

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

  // /api/project/list
  getProjectList: data => Get('/api/project/list', data),

  // /api/project/save
  saveProject: data => Post('/api/project/save', data),

  // /api/project/delete
  deleteProject: data => Post('/api/project/delete', data),

  // /api/project/project/users
  getProjectUserList: data => Get('/api/project/project/users', data),
}
