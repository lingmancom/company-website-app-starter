interface AppStore {
  account: {
    userinfo: UserInfo | null
  }
  app: {
    title: string
    device: string
    token: string
    sidebar: { collapse: string }
  }
  menu: {
    menus: Menu[]
  }
  tags: {
    tagList: Tag[]
    cacheList: import('vue-router').RouteLocationNormalizedLoaded[]
    activePosition: number
  }
  layoutSettings: {
    menus: {
      mode: string
    }
    tagsbar: {
      isShow: boolean
    }
    breadcrumbs: {
      isShow: boolean
    }
    topbar: {
      isFixed: boolean
    }
    layout: {
      isFluid: boolean
    }
  }
}
