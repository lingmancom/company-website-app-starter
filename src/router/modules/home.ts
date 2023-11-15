export default <AppRouterRaw[]>[
  {
    path: '/home',
    component: () => import('@/layout/index.vue'),
    name: 'Dashboard',
    icon: 'House',
    meta: {
      title: '工作台',
    },
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/user.vue'),
        icon: 'House',
        meta: {
          title: '用户列表',
        },
      },
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        icon: 'House',
        meta: {
          title: '流程',
        },
      },

    ],
  },
]
