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
